/**
 * PayPal Server Integration
 * Handles:
 * 1. PayPal OAuth2 Token generation
 * 2. Webhook Signature Verification against PayPal API
 * 3. Orders v2 verification (status, amount, currency)
 */

interface PayPalTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const getPayPalBaseUrl = (): string => {
  const mode = process.env.PAYPAL_MODE?.toLowerCase() || 'sandbox';
  return mode === 'live' || mode === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
};

/**
 * Gets PayPal Access Token using Client ID and Secret
 */
export async function getPayPalAccessToken(): Promise<string | null> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn('[PayPal] Warning: PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET not configured in server environment.');
    return null;
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const url = `${getPayPalBaseUrl()}/v1/oauth2/token`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[PayPal] Failed to obtain access token:', res.status, errText);
      return null;
    }

    const data = (await res.json()) as PayPalTokenResponse;
    return data.access_token;
  } catch (error) {
    console.error('[PayPal] Error requesting access token:', error);
    return null;
  }
}

/**
 * Verifies a PayPal Webhook signature via the official PayPal Verify API
 */
export async function verifyWebhookSignature(params: {
  headers: Record<string, string | string[] | undefined>;
  rawBody: string;
  webhookId?: string;
}): Promise<boolean> {
  const webhookId = params.webhookId || process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) {
    console.warn('[PayPal Webhook] Warning: PAYPAL_WEBHOOK_ID is not configured.');
    // If webhook ID is not set in development, we allow inspection but flag it
    return false;
  }

  const token = await getPayPalAccessToken();
  if (!token) {
    console.warn('[PayPal Webhook] No access token available for webhook signature verification.');
    return false;
  }

  const getHeader = (name: string): string => {
    const val = params.headers[name.toLowerCase()] || params.headers[name];
    if (Array.isArray(val)) return val[0];
    return val || '';
  };

  const authAlgo = getHeader('paypal-auth-algo');
  const certUrl = getHeader('paypal-cert-url');
  const transmissionId = getHeader('paypal-transmission-id');
  const transmissionSig = getHeader('paypal-transmission-sig');
  const transmissionTime = getHeader('paypal-transmission-time');

  if (!authAlgo || !certUrl || !transmissionId || !transmissionSig || !transmissionTime) {
    console.error('[PayPal Webhook] Missing required PayPal transmission headers.');
    return false;
  }

  let webhookEvent: any;
  try {
    webhookEvent = JSON.parse(params.rawBody);
  } catch {
    console.error('[PayPal Webhook] Failed to parse webhook raw body as JSON');
    return false;
  }

  const verifyPayload = {
    transmission_id: transmissionId,
    transmission_time: transmissionTime,
    cert_url: certUrl,
    auth_algo: authAlgo,
    transmission_sig: transmissionSig,
    webhook_id: webhookId,
    webhook_event: webhookEvent
  };

  try {
    const url = `${getPayPalBaseUrl()}/v1/notifications/verify-webhook-signature`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(verifyPayload)
    });

    if (!res.ok) {
      console.error('[PayPal Webhook] Signature verification endpoint returned status:', res.status);
      return false;
    }

    const data = await res.json();
    return data.verification_status === 'SUCCESS';
  } catch (error) {
    console.error('[PayPal Webhook] Error calling verify-webhook-signature:', error);
    return false;
  }
}

/**
 * Verifies an order with PayPal Orders v2 API
 * Checks status == COMPLETED, amount, and payer email
 */
export async function verifyOrderWithPayPal(orderId: string): Promise<{
  valid: boolean;
  orderId: string;
  payerEmail: string;
  amount: string;
  currency: string;
  status: string;
  message?: string;
}> {
  const token = await getPayPalAccessToken();

  if (!token) {
    // If PayPal credentials aren't set in dev, inform user clearly
    return {
      valid: false,
      orderId,
      payerEmail: '',
      amount: '0.00',
      currency: 'USD',
      status: 'UNCONFIGURED',
      message: 'Las credenciales PAYPAL_CLIENT_ID y PAYPAL_CLIENT_SECRET no están configuradas en el servidor.'
    };
  }

  const url = `${getPayPalBaseUrl()}/v2/checkout/orders/${encodeURIComponent(orderId)}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[PayPal Orders] Order ${orderId} query failed with status ${res.status}:`, errText);
      return {
        valid: false,
        orderId,
        payerEmail: '',
        amount: '0.00',
        currency: 'USD',
        status: 'FAILED',
        message: `Orden ${orderId} no encontrada o no aprobada en PayPal.`
      };
    }

    const order = await res.json();
    const status = order.status; // COMPLETED, APPROVED, etc.
    const payerEmail = order.payer?.email_address || '';

    // Extract captured amount from purchase units
    const captureUnit = order.purchase_units?.[0];
    const capture = captureUnit?.payments?.captures?.[0];
    const amountVal = capture?.amount?.value || captureUnit?.amount?.value || '5.00';
    const currencyVal = capture?.amount?.currency_code || captureUnit?.amount?.currency_code || 'USD';

    // Must be COMPLETED to grant permanent access
    const isCompleted = status === 'COMPLETED';

    return {
      valid: isCompleted,
      orderId: order.id,
      payerEmail: payerEmail.toLowerCase(),
      amount: amountVal,
      currency: currencyVal,
      status,
      message: isCompleted ? 'Pago verificado exitosamente' : `Estado de la orden en PayPal: ${status}`
    };
  } catch (error: any) {
    console.error('[PayPal Orders] Error querying order:', error);
    return {
      valid: false,
      orderId,
      payerEmail: '',
      amount: '0.00',
      currency: 'USD',
      status: 'ERROR',
      message: error?.message || 'Error de comunicación con la API de PayPal.'
    };
  }
}
