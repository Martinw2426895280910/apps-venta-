import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
  createOrGetUser, 
  getUserByEmail, 
  createMagicLink, 
  verifyMagicTokenOrCode, 
  getPurchasesForUser, 
  hasValidAccess, 
  saveOrUpdatePurchase, 
  revokePurchaseByOrderId, 
  claimPurchaseForUser,
  getPurchaseByOrderId,
  redeemCodeOrOrder
} from './db.js';
import { 
  verifyWebhookSignature, 
  verifyOrderWithPayPal 
} from './paypal.js';

dotenv.config();

export function createExpressApp() {
  const app = express();

  // Middleware for parsing JSON with raw body retention for PayPal signature verification
  app.use(cors());
  app.use(express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf.toString('utf-8');
    }
  }));
  app.use(express.urlencoded({ extended: true }));

  // ==========================================
  // 1. HEALTH CHECK
  // ==========================================
  app.get('/api/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      paypalConfigured: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
      mode: process.env.PAYPAL_MODE || 'sandbox'
    });
  });

  // ==========================================
  // 2. AUTHENTICATION: MAGIC LINK & GOOGLE LOGIN
  // ==========================================
  app.post('/api/auth/magic-link', (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Debes proporcionar un correo electrónico válido.' });
    }

    const normalized = email.trim().toLowerCase();
    createOrGetUser(normalized);
    const { token, code } = createMagicLink(normalized);

    console.log(`[Auth] Magic Link generated for ${normalized}: Code = ${code}, Token = ${token}`);

    res.json({
      success: true,
      message: `Enlace y código de acceso generados para ${normalized}.`,
      code, // Helpful preview code for immediate verification
      expiresInMinutes: 15
    });
  });

  app.post('/api/auth/verify', (req, res) => {
    const { tokenOrCode } = req.body;
    if (!tokenOrCode) {
      return res.status(400).json({ error: 'Ingresa el código de 6 dígitos o enlace recibido.' });
    }

    const verifiedEmail = verifyMagicTokenOrCode(tokenOrCode);
    if (!verifiedEmail) {
      return res.status(400).json({ 
        error: 'El código de acceso es incorrecto o ya ha expirado (validez: 15 min). Solicita uno nuevo.' 
      });
    }

    const user = createOrGetUser(verifiedEmail);
    const hasAccess = hasValidAccess(verifiedEmail);
    const purchases = getPurchasesForUser(verifiedEmail);

    res.json({
      success: true,
      user,
      hasAccess,
      purchases,
      token: `sess_${Buffer.from(verifiedEmail).toString('base64')}`
    });
  });

  app.post('/api/auth/google', (req, res) => {
    const { email, name } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Correo de Google no válido.' });
    }

    const normalized = email.trim().toLowerCase();
    const user = createOrGetUser(normalized, name);
    const hasAccess = hasValidAccess(normalized);
    const purchases = getPurchasesForUser(normalized);

    res.json({
      success: true,
      user,
      hasAccess,
      purchases,
      token: `sess_${Buffer.from(normalized).toString('base64')}`
    });
  });

  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization || '';
    const emailHeader = (req.headers['x-user-email'] as string) || '';
    let email = '';

    if (emailHeader) {
      email = emailHeader.trim().toLowerCase();
    } else if (authHeader.startsWith('Bearer sess_')) {
      try {
        const base64 = authHeader.replace('Bearer sess_', '');
        email = Buffer.from(base64, 'base64').toString('utf-8').trim().toLowerCase();
      } catch {
        email = '';
      }
    }

    if (!email) {
      return res.json({ user: null, hasAccess: false, purchases: [] });
    }

    const user = getUserByEmail(email) || createOrGetUser(email);
    const hasAccess = hasValidAccess(email);
    const purchases = getPurchasesForUser(email);

    res.json({
      user,
      hasAccess,
      purchases
    });
  });

  // ==========================================
  // 3. PAYPAL WEBHOOK (Capture, Refund, Dispute)
  // ==========================================
  app.post('/api/paypal/webhook', async (req: any, res) => {
    const event = req.body;
    const eventType = event?.event_type;
    console.log(`[PayPal Webhook] Received event: ${eventType}`);

    if (process.env.PAYPAL_WEBHOOK_ID) {
      const isValid = await verifyWebhookSignature({
        headers: req.headers,
        rawBody: req.rawBody || JSON.stringify(event)
      });

      if (!isValid) {
        console.error('[PayPal Webhook] Signature verification failed!');
        return res.status(400).json({ error: 'Firma de webhook de PayPal inválida.' });
      }
      console.log('[PayPal Webhook] Signature successfully verified via PayPal API.');
    } else {
      console.log('[PayPal Webhook] Notice: PAYPAL_WEBHOOK_ID not set; accepting in permissive mode.');
    }

    try {
      const resource = event?.resource || {};

      switch (eventType) {
        case 'PAYMENT.CAPTURE.COMPLETED': {
          const orderId = resource.supplementary_data?.related_ids?.order_id || resource.id;
          const payerEmail = (
            resource.payer?.email_address || 
            resource.billing_agreement_id || 
            resource.custom_id || 
            ''
          ).toLowerCase();
          const amount = resource.amount?.value || '5.00';
          const currency = resource.amount?.currency_code || 'USD';

          if (orderId && payerEmail) {
            saveOrUpdatePurchase({
              order_id: orderId,
              payer_email: payerEmail,
              user_email: payerEmail,
              amount,
              currency,
              status: 'COMPLETED',
              raw_data: { event_type: eventType, capture_id: resource.id }
            });
            console.log(`[PayPal Webhook] Granted lifetime access to: ${payerEmail} (Order: ${orderId})`);
          }
          break;
        }

        case 'CHECKOUT.ORDER.APPROVED': {
          const orderId = resource.id;
          const payerEmail = (resource.payer?.email_address || '').toLowerCase();
          const amount = resource.purchase_units?.[0]?.amount?.value || '5.00';
          const currency = resource.purchase_units?.[0]?.amount?.currency_code || 'USD';

          if (orderId && payerEmail) {
            saveOrUpdatePurchase({
              order_id: orderId,
              payer_email: payerEmail,
              user_email: payerEmail,
              amount,
              currency,
              status: 'COMPLETED',
              raw_data: { event_type: eventType }
            });
            console.log(`[PayPal Webhook] Order approved and access registered: ${payerEmail}`);
          }
          break;
        }

        case 'PAYMENT.CAPTURE.REFUNDED':
        case 'PAYMENT.CAPTURE.REVERSED': {
          const orderId = resource.supplementary_data?.related_ids?.order_id || resource.id;
          console.log(`[PayPal Webhook] Revoking access due to refund/reversal: Order ${orderId}`);
          revokePurchaseByOrderId(orderId, 'REFUNDED');
          break;
        }

        case 'CUSTOMER.DISPUTE.CREATED': {
          const disputedTxnId = resource.disputed_transactions?.[0]?.buyer_transaction_id;
          if (disputedTxnId) {
            console.log(`[PayPal Webhook] Revoking access due to dispute: Txn ${disputedTxnId}`);
            revokePurchaseByOrderId(disputedTxnId, 'DISPUTED');
          }
          break;
        }

        default:
          console.log(`[PayPal Webhook] Event ignored: ${eventType}`);
      }

      return res.status(200).json({ received: true });
    } catch (err: any) {
      console.error('[PayPal Webhook] Error processing event:', err);
      return res.status(500).json({ error: 'Error procesando webhook.' });
    }
  });

  // ==========================================
  // 4. RETURN URL ORDER VERIFICATION
  // ==========================================
  app.post('/api/paypal/verify-return-order', async (req, res) => {
    const { orderId, userEmail, paymentToken } = req.body;

    const targetOrderId = (orderId || paymentToken || '').trim();
    if (!targetOrderId) {
      return res.status(400).json({ 
        success: false, 
        error: 'No se recibió identificador de orden o token de pago.' 
      });
    }

    const targetUser = (userEmail || '').trim().toLowerCase();

    // Check local database
    const existing = getPurchaseByOrderId(targetOrderId);
    if (existing && existing.status === 'COMPLETED') {
      if (targetUser && !existing.user_email) {
        existing.user_email = targetUser;
      }
      return res.json({
        success: true,
        verified: true,
        purchase: existing,
        message: '¡Pago confirmado! Tu acceso permanente a la guía ha sido activado.'
      });
    }

    // Verify with PayPal API
    const verification = await verifyOrderWithPayPal(targetOrderId);

    if (verification.valid) {
      const payerEmail = verification.payerEmail || targetUser;
      const purchase = saveOrUpdatePurchase({
        order_id: verification.orderId,
        payer_email: payerEmail,
        user_email: targetUser || payerEmail,
        amount: verification.amount,
        currency: verification.currency,
        status: 'COMPLETED',
        raw_data: { source: 'api_verification' }
      });

      return res.json({
        success: true,
        verified: true,
        purchase,
        message: '¡Pago verificado exitosamente con PayPal! Bienvenido a la guía completa.'
      });
    }

    if (verification.status === 'UNCONFIGURED') {
      return res.status(200).json({
        success: false,
        unconfigured: true,
        message: 'Las credenciales de PayPal deben configurarse en las variables de entorno para verificación directa.'
      });
    }

    return res.status(400).json({
      success: false,
      error: verification.message || 'No se pudo confirmar el pago con PayPal.'
    });
  });

  // ==========================================
  // 5. CLAIM PURCHASE
  // ==========================================
  app.post('/api/purchases/claim', (req, res) => {
    const { userEmail, paypalEmail, orderId } = req.body;

    if (!userEmail || !userEmail.includes('@')) {
      return res.status(400).json({ error: 'Debes haber iniciado sesión con tu correo.' });
    }
    if (!paypalEmail || !paypalEmail.includes('@')) {
      return res.status(400).json({ error: 'Debes ingresar el correo que usaste al pagar en PayPal.' });
    }

    const result = claimPurchaseForUser(userEmail, paypalEmail, orderId);
    if (!result.success) {
      return res.status(404).json({ error: result.message });
    }

    const purchases = getPurchasesForUser(userEmail);
    res.json({
      success: true,
      message: result.message,
      hasAccess: true,
      purchases
    });
  });

  // ==========================================
  // 6. REDEEM CODE OR ORDER (ANTI-SHARING)
  // ==========================================
  app.post('/api/purchases/redeem-code', (req, res) => {
    const { code, userEmail } = req.body;
    if (!code || !code.trim()) {
      return res.status(400).json({ 
        success: false, 
        error: 'Ingresa tu ID de transacción de PayPal o código personal de acceso.' 
      });
    }

    const result = redeemCodeOrOrder(code.trim(), userEmail);
    if (!result.success) {
      return res.status(400).json({ 
        success: false, 
        error: result.message 
      });
    }

    res.json({
      success: true,
      message: result.message,
      purchase: result.purchase,
      hasAccess: true
    });
  });

  // ==========================================
  // 7. ACCESS STATUS CHECK
  // ==========================================
  app.get('/api/access-status', (req, res) => {
    const email = (req.query.email as string || '').trim().toLowerCase();
    if (!email) {
      return res.json({ hasAccess: false, purchases: [] });
    }

    const hasAccess = hasValidAccess(email);
    const purchases = getPurchasesForUser(email);

    res.json({
      email,
      hasAccess,
      purchases
    });
  });

  return app;
}
