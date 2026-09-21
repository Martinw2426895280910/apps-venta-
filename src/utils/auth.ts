export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  claimed_emails: string[];
}

export interface PurchaseRecord {
  id: string;
  order_id: string;
  payer_email: string;
  user_email: string;
  amount: string;
  currency: string;
  status: 'COMPLETED' | 'REFUNDED' | 'DISPUTED' | 'REVERSED';
  created_at: string;
}

const AUTH_USER_KEY = 'conquista50_user';
const AUTH_TOKEN_KEY = 'conquista50_token';

export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function saveSession(user: UserProfile, token: string) {
  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (err) {
    console.error('Failed saving session:', err);
  }
}

export function clearSession() {
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Request magic link or 6-digit access code for an email
 */
export async function requestMagicLink(email: string): Promise<{
  success: boolean;
  message: string;
  code?: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.error || 'Error al solicitar acceso' };
    }
    return { success: true, message: data.message, code: data.code };
  } catch (error: any) {
    return { success: false, message: error?.message || 'Error de conexión con el servidor' };
  }
}

/**
 * Verify magic code / token
 */
export async function verifyMagicCode(tokenOrCode: string, email?: string): Promise<{
  success: boolean;
  user?: UserProfile;
  hasAccess?: boolean;
  token?: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenOrCode, email })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Código incorrecto o expirado' };
    }
    if (data.user && data.token) {
      saveSession(data.user, data.token);
    }
    return { 
      success: true, 
      user: data.user, 
      hasAccess: Boolean(data.hasAccess), 
      token: data.token 
    };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Error de conexión' };
  }
}

/**
 * Log in with Google account (or client-side verified email)
 */
export async function loginWithGoogle(email: string, name?: string): Promise<{
  success: boolean;
  user?: UserProfile;
  hasAccess?: boolean;
  error?: string;
}> {
  try {
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Error con inicio de sesión de Google' };
    }
    if (data.user && data.token) {
      saveSession(data.user, data.token);
    }
    return { 
      success: true, 
      user: data.user, 
      hasAccess: Boolean(data.hasAccess) 
    };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Error de conexión' };
  }
}

/**
 * Check current access status from server
 */
export async function checkServerAccess(email: string): Promise<{
  hasAccess: boolean;
  purchases: PurchaseRecord[];
  user?: UserProfile;
}> {
  try {
    const token = getStoredToken();
    const res = await fetch('/api/auth/me', {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'x-user-email': email
      }
    });
    const data = await res.json();
    return {
      hasAccess: Boolean(data.hasAccess),
      purchases: data.purchases || [],
      user: data.user
    };
  } catch {
    return { hasAccess: false, purchases: [] };
  }
}

/**
 * Verify order on return URL
 */
export async function verifyReturnOrder(params: {
  orderId?: string;
  paymentToken?: string;
  userEmail?: string;
}): Promise<{
  success: boolean;
  verified?: boolean;
  unconfigured?: boolean;
  purchase?: PurchaseRecord;
  message?: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/paypal/verify-return-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok && !data.unconfigured) {
      return { success: false, error: data.error || 'No se pudo verificar la orden' };
    }
    return data;
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error verificando orden con el servidor' };
  }
}

/**
 * Claim purchase by PayPal email
 */
export async function claimPurchase(params: {
  userEmail: string;
  paypalEmail: string;
  orderId?: string;
}): Promise<{
  success: boolean;
  hasAccess?: boolean;
  message?: string;
  error?: string;
}> {
  try {
    const res = await fetch('/api/purchases/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'No se pudo vincular la compra' };
    }
    return { success: true, hasAccess: true, message: data.message };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error conectando con el servidor' };
  }
}

/**
 * Redeem unique personal code or PayPal Order ID.
 * Strictly prevents multiple people from using the same key/order.
 */
export async function redeemPersonalCode(code: string, userEmail?: string): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  hasAccess?: boolean;
}> {
  try {
    const res = await fetch('/api/purchases/redeem-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.trim(), userEmail })
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Código o ID de transacción no válido.' };
    }
    return {
      success: true,
      hasAccess: true,
      message: data.message
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error de conexión con el servidor.' };
  }
}
