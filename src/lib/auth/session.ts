/**
 * Admin session tokens — HMAC-signed, tamper-proof.
 *
 * Uses the Web Crypto API so the same module runs in both the Node.js
 * runtime (route handlers) and the Edge runtime (middleware). Tokens are
 * `base64url(payload).base64url(HMAC-SHA256(payload))`; verification rejects
 * any token whose signature doesn't match the server secret or that has expired.
 */

export interface AdminSessionUser {
  id: string;
  email: string;
  role: 'admin';
  name: string;
}

export interface AdminSession {
  user: AdminSessionUser;
  expiresAt: number; // epoch ms
  sessionId: string;
}

export const SESSION_COOKIE = 'admin_session';
export const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

/**
 * Resolve the signing secret. Fails closed in production: a missing/weak
 * secret throws rather than silently falling back to a guessable value.
 */
function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (secret && secret.length >= 16) {
    return secret;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'SESSION_SECRET (min 16 chars) must be set in production for admin auth'
    );
  }
  return 'dev-insecure-session-secret-change-me';
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(input: string): Uint8Array<ArrayBuffer> {
  let s = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4;
  if (pad) {
    s += '='.repeat(4 - pad);
  }
  const binary = atob(s);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function utf8Bytes(text: string): Uint8Array<ArrayBuffer> {
  const encoded = new TextEncoder().encode(text);
  const bytes = new Uint8Array(new ArrayBuffer(encoded.length));
  bytes.set(encoded);
  return bytes;
}

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    utf8Bytes(getSessionSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export function generateSessionId(): string {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

/**
 * Build a signed session token.
 */
export async function createSessionToken(session: AdminSession): Promise<string> {
  const payloadBytes = utf8Bytes(JSON.stringify(session));
  const payloadPart = base64UrlEncode(payloadBytes);
  const key = await getKey();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    utf8Bytes(payloadPart)
  );
  const sigPart = base64UrlEncode(new Uint8Array(signature));
  return `${payloadPart}.${sigPart}`;
}

/**
 * Verify a token's signature and expiry. Returns the session or null.
 * Never throws on malformed input.
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<AdminSession | null> {
  if (!token) return null;
  const dot = token.indexOf('.');
  if (dot <= 0) return null;

  const payloadPart = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);

  let signatureValid = false;
  try {
    const key = await getKey();
    signatureValid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlDecode(sigPart),
      utf8Bytes(payloadPart)
    );
  } catch {
    return null;
  }
  if (!signatureValid) return null;

  try {
    const json = new TextDecoder().decode(base64UrlDecode(payloadPart));
    const session = JSON.parse(json) as AdminSession;
    if (!session || typeof session.expiresAt !== 'number') return null;
    if (session.expiresAt < Date.now()) return null;
    if (session.user?.role !== 'admin') return null;
    return session;
  } catch {
    return null;
  }
}

/**
 * One-time sign-in links ("Forgot password?").
 *
 * Same HMAC key as sessions, but the signed message is prefixed with a
 * purpose label, so a link token can never be replayed as a session cookie
 * (and vice versa). Links are short-lived; single use is enforced by the
 * route that redeems them.
 */
export const MAGIC_LINK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const MAGIC_LINK_PURPOSE = 'admin-magic-link';

export interface MagicLinkPayload {
  purpose: typeof MAGIC_LINK_PURPOSE;
  email: string;
  expiresAt: number; // epoch ms
  nonce: string;
}

export async function createMagicLinkToken(email: string): Promise<string> {
  const payload: MagicLinkPayload = {
    purpose: MAGIC_LINK_PURPOSE,
    email,
    expiresAt: Date.now() + MAGIC_LINK_DURATION_MS,
    nonce: generateSessionId(),
  };
  const payloadPart = base64UrlEncode(utf8Bytes(JSON.stringify(payload)));
  const key = await getKey();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    utf8Bytes(`${MAGIC_LINK_PURPOSE}.${payloadPart}`)
  );
  return `${payloadPart}.${base64UrlEncode(new Uint8Array(signature))}`;
}

/** Verify a sign-in link's signature, purpose and expiry. Never throws. */
export async function verifyMagicLinkToken(
  token: string | undefined | null
): Promise<MagicLinkPayload | null> {
  if (!token || typeof token !== 'string') return null;
  const dot = token.indexOf('.');
  if (dot <= 0) return null;
  const payloadPart = token.slice(0, dot);
  const sigPart = token.slice(dot + 1);

  try {
    const key = await getKey();
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlDecode(sigPart),
      utf8Bytes(`${MAGIC_LINK_PURPOSE}.${payloadPart}`)
    );
    if (!valid) return null;
    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payloadPart))
    ) as MagicLinkPayload;
    if (payload?.purpose !== MAGIC_LINK_PURPOSE) return null;
    if (typeof payload.expiresAt !== 'number' || payload.expiresAt < Date.now()) return null;
    if (typeof payload.email !== 'string' || typeof payload.nonce !== 'string') return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Cookie options shared by login/session/logout so they stay in sync.
 * `path: '/'` so middleware on both /admin and /api/admin can read it.
 */
export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}
