import fs from 'fs';
import path from 'path';

export interface Purchase {
  id: string;
  order_id: string;
  payer_email: string;
  user_email: string;
  amount: string;
  currency: string;
  status: 'COMPLETED' | 'REFUNDED' | 'DISPUTED' | 'REVERSED';
  created_at: string;
  updated_at: string;
  raw_data?: any;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
  claimed_emails: string[];
}

export interface MagicLink {
  token: string;
  code: string;
  email: string;
  expires_at: number;
}

export interface Voucher {
  code: string;
  created_at: string;
  used_by: string | null;
  used_at: string | null;
}

interface DatabaseSchema {
  purchases: Purchase[];
  users: User[];
  magic_links: MagicLink[];
  vouchers: Voucher[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

function ensureDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialDb: DatabaseSchema = {
        purchases: [],
        users: [],
        magic_links: [],
        vouchers: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return {
      purchases: parsed.purchases || [],
      users: parsed.users || [],
      magic_links: parsed.magic_links || [],
      vouchers: parsed.vouchers || []
    };
  } catch (error) {
    console.error('Error loading database:', error);
    return { purchases: [], users: [], magic_links: [], vouchers: [] };
  }
}

function writeDb(data: DatabaseSchema) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

// User methods
export function getUserByEmail(email: string): User | null {
  const normalized = email.trim().toLowerCase();
  const db = ensureDb();
  return db.users.find(u => u.email.toLowerCase() === normalized) || null;
}

export function createOrGetUser(email: string, name?: string): User {
  const normalized = email.trim().toLowerCase();
  const db = ensureDb();
  let user = db.users.find(u => u.email.toLowerCase() === normalized);
  if (!user) {
    user = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email: normalized,
      name: name || normalized.split('@')[0],
      created_at: new Date().toISOString(),
      claimed_emails: [normalized]
    };
    db.users.push(user);
    writeDb(db);
  }
  return user;
}

// Magic link methods
export function createMagicLink(email: string): { token: string; code: string } {
  const normalized = email.trim().toLowerCase();
  const token = `mag_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  const expires_at = Date.now() + 15 * 60 * 1000; // 15 mins

  const db = ensureDb();
  // Remove expired links
  db.magic_links = db.magic_links.filter(m => m.expires_at > Date.now());
  db.magic_links.push({ token, code, email: normalized, expires_at });
  writeDb(db);

  return { token, code };
}

export function verifyMagicTokenOrCode(tokenOrCode: string): string | null {
  const db = ensureDb();
  const now = Date.now();
  const cleanInput = tokenOrCode.trim();

  const foundIndex = db.magic_links.findIndex(
    m => (m.token === cleanInput || m.code === cleanInput) && m.expires_at > now
  );

  if (foundIndex === -1) {
    return null;
  }

  const email = db.magic_links[foundIndex].email;
  // Consume the magic link
  db.magic_links.splice(foundIndex, 1);
  writeDb(db);

  return email;
}

// Purchases methods
export function getPurchaseByOrderId(orderId: string): Purchase | null {
  const db = ensureDb();
  return db.purchases.find(p => p.order_id === orderId.trim()) || null;
}

export function getPurchasesForUser(userEmail: string): Purchase[] {
  const normalized = userEmail.trim().toLowerCase();
  const db = ensureDb();
  const user = db.users.find(u => u.email.toLowerCase() === normalized);
  const eligibleEmails = new Set<string>([normalized]);
  if (user?.claimed_emails) {
    user.claimed_emails.forEach(e => eligibleEmails.add(e.toLowerCase()));
  }

  return db.purchases.filter(p => 
    eligibleEmails.has(p.user_email?.toLowerCase()) || 
    eligibleEmails.has(p.payer_email?.toLowerCase())
  );
}

export function hasValidAccess(userEmail: string): boolean {
  if (!userEmail) return false;
  const purchases = getPurchasesForUser(userEmail);
  return purchases.some(p => p.status === 'COMPLETED');
}

export function saveOrUpdatePurchase(data: {
  order_id: string;
  payer_email: string;
  user_email?: string;
  amount: string;
  currency: string;
  status: 'COMPLETED' | 'REFUNDED' | 'DISPUTED' | 'REVERSED';
  raw_data?: any;
}): Purchase {
  const db = ensureDb();
  const normalizedPayer = data.payer_email.trim().toLowerCase();
  const normalizedUser = (data.user_email || normalizedPayer).trim().toLowerCase();

  // Also ensure user exists
  createOrGetUser(normalizedUser);

  const existingIndex = db.purchases.findIndex(p => p.order_id === data.order_id.trim());
  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const existing = db.purchases[existingIndex];
    const updated: Purchase = {
      ...existing,
      payer_email: normalizedPayer,
      user_email: normalizedUser || existing.user_email,
      amount: data.amount || existing.amount,
      currency: data.currency || existing.currency,
      status: data.status,
      updated_at: now,
      raw_data: data.raw_data || existing.raw_data
    };
    db.purchases[existingIndex] = updated;
    writeDb(db);
    return updated;
  } else {
    const newPurchase: Purchase = {
      id: `pur_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      order_id: data.order_id.trim(),
      payer_email: normalizedPayer,
      user_email: normalizedUser,
      amount: data.amount,
      currency: data.currency,
      status: data.status,
      created_at: now,
      updated_at: now,
      raw_data: data.raw_data
    };
    db.purchases.push(newPurchase);
    writeDb(db);
    return newPurchase;
  }
}

export function revokePurchaseByOrderId(orderId: string, newStatus: 'REFUNDED' | 'DISPUTED' | 'REVERSED'): boolean {
  const db = ensureDb();
  const purchase = db.purchases.find(p => p.order_id === orderId.trim());
  if (purchase) {
    purchase.status = newStatus;
    purchase.updated_at = new Date().toISOString();
    writeDb(db);
    return true;
  }
  return false;
}

export function claimPurchaseForUser(userEmail: string, payerEmail: string, orderId?: string): { success: boolean; message: string; purchase?: Purchase } {
  const db = ensureDb();
  const normUser = userEmail.trim().toLowerCase();
  const normPayer = payerEmail.trim().toLowerCase();

  const user = createOrGetUser(normUser);

  // Find purchase by payerEmail or orderId
  let purchase: Purchase | undefined;
  if (orderId && orderId.trim()) {
    purchase = db.purchases.find(p => p.order_id === orderId.trim());
  } else {
    purchase = db.purchases.find(p => p.payer_email.toLowerCase() === normPayer && p.status === 'COMPLETED');
  }

  if (!purchase) {
    return {
      success: false,
      message: `No se encontró ninguna compra completada asociada al correo de PayPal "${normPayer}". Por favor verifica el correo o ingresa el ID de transacción.`
    };
  }

  if (purchase.status !== 'COMPLETED') {
    return {
      success: false,
      message: `La compra encontrada tiene estado "${purchase.status}" y no otorga acceso activo.`
    };
  }

  // ANTI-SHARING CHECK: If this purchase was already claimed by another user account, reject!
  if (purchase.user_email && purchase.user_email.toLowerCase() !== normUser && purchase.payer_email.toLowerCase() !== normUser) {
    return {
      success: false,
      message: 'Esta compra ya fue vinculada a otra cuenta registrada. No está permitido compartir accesos entre distintas personas; cada usuario debe adquirir su propia guía.'
    };
  }

  // If registering from a different email than payer email without orderId, request the orderId
  if (normUser !== normPayer && (!orderId || !orderId.trim()) && purchase.user_email && purchase.user_email.toLowerCase() !== normUser) {
    return {
      success: false,
      message: 'Como tu correo registrado no coincide con el de PayPal, debes ingresar el ID de Orden o Transacción de tu recibo para comprobar que eres el comprador titular.'
    };
  }

  // Link purchase to this user
  purchase.user_email = normUser;
  purchase.updated_at = new Date().toISOString();

  if (!user.claimed_emails.includes(normPayer)) {
    user.claimed_emails.push(normPayer);
  }

  writeDb(db);

  return {
    success: true,
    message: '¡Compra vinculada exitosamente a tu cuenta! Tu acceso de por vida está activo.',
    purchase
  };
}

/**
 * Validate and redeem a personal code or PayPal Order ID.
 * Strictly prevents multiple people from using the same key/order.
 */
export function redeemCodeOrOrder(codeOrOrderId: string, userEmail?: string): {
  success: boolean;
  message: string;
  purchase?: Purchase;
} {
  const db = ensureDb();
  const cleanCode = codeOrOrderId.trim();
  const normUser = userEmail ? userEmail.trim().toLowerCase() : '';

  if (!cleanCode) {
    return {
      success: false,
      message: 'Por favor ingresa tu ID de transacción de PayPal o código personal.'
    };
  }

  // 1. Check if the code is an order_id from PayPal in our purchases database
  const existingPurchase = db.purchases.find(p => p.order_id.toLowerCase() === cleanCode.toLowerCase());
  if (existingPurchase) {
    if (existingPurchase.status !== 'COMPLETED') {
      return {
        success: false,
        message: `Esta orden de pago tiene estado "${existingPurchase.status}" y no cuenta con pago completado.`
      };
    }

    // Check if another person already claimed this order ID
    if (existingPurchase.user_email && normUser && existingPurchase.user_email.toLowerCase() !== normUser) {
      return {
        success: false,
        message: 'Este ID de orden ya fue activado por otro comprador. No es posible compartir el acceso con otra persona; cada usuario debe realizar su propia compra individual de $5 USD.'
      };
    }

    // Link to this user if not yet linked
    if (normUser) {
      existingPurchase.user_email = normUser;
      const u = createOrGetUser(normUser);
      if (!u.claimed_emails.includes(existingPurchase.payer_email)) {
        u.claimed_emails.push(existingPurchase.payer_email);
      }
      writeDb(db);
    }

    return {
      success: true,
      message: '¡Pago verificado y validado exitosamente! Tu acceso personal está activo.',
      purchase: existingPurchase
    };
  }

  // 2. Check if it is a single-use voucher
  const voucher = db.vouchers.find(v => v.code.toUpperCase() === cleanCode.toUpperCase());
  if (voucher) {
    // If voucher was already used by someone else
    if (voucher.used_by && normUser && voucher.used_by.toLowerCase() !== normUser) {
      return {
        success: false,
        message: 'Este código personal ya fue canjeado por otra persona y ha quedado invalidado. Cada comprador debe contar con su propio pago.'
      };
    }

    if (voucher.used_by && !normUser) {
      return {
        success: false,
        message: 'Este código ya ha sido canjeado anteriormente. Debes iniciar sesión con la cuenta con la que fue canjeado.'
      };
    }

    // Mark voucher as used by this user
    const targetUser = normUser || `comprador_${Date.now()}@conquista50.com`;
    voucher.used_by = targetUser;
    voucher.used_at = new Date().toISOString();

    const newPurchase = saveOrUpdatePurchase({
      order_id: `VOUCHER_${voucher.code}`,
      payer_email: targetUser,
      user_email: targetUser,
      amount: '5.00',
      currency: 'USD',
      status: 'COMPLETED',
      raw_data: { source: 'voucher_redeem', voucher_code: voucher.code }
    });

    writeDb(db);

    return {
      success: true,
      message: '¡Código de acceso único canjeado exitosamente!',
      purchase: newPurchase
    };
  }

  // 3. If it's a generic static key (like someone trying CONQUISTA50 or any shared string)
  return {
    success: false,
    message: 'Clave no válida. Las claves compartidas están desactivadas: cada persona debe realizar el pago individual de $5 USD con PayPal para obtener su acceso único.'
  };
}

export function createSingleUseVoucher(code: string): Voucher {
  const db = ensureDb();
  const clean = code.trim().toUpperCase();
  let existing = db.vouchers.find(v => v.code === clean);
  if (!existing) {
    existing = {
      code: clean,
      created_at: new Date().toISOString(),
      used_by: null,
      used_at: null
    };
    db.vouchers.push(existing);
    writeDb(db);
  }
  return existing;
}
