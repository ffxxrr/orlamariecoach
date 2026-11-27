import { NextRequest, NextResponse } from 'next/server';
import {
  AdminSession,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  createSessionToken,
  generateSessionId,
  sessionCookieOptions,
  verifyMagicLinkToken,
} from '@/lib/auth/session';
import { getAdminEmail } from '@/lib/auth/admin-email';

/**
 * Redeems a one-time sign-in link (see ../forgot). POST only, triggered by a
 * button on the login page, so email link scanners that pre-open URLs can't
 * use up the link. Each link works once: used nonces are remembered until
 * the link would have expired anyway.
 */

const usedNonces = new Map<string, number>(); // nonce -> expiresAt

function markUsed(nonce: string, expiresAt: number): boolean {
  const now = Date.now();
  for (const [n, exp] of usedNonces) if (exp < now) usedNonces.delete(n);
  if (usedNonces.has(nonce)) return false;
  usedNonces.set(nonce, expiresAt);
  return true;
}

export async function POST(request: NextRequest) {
  let token: unknown;
  try {
    token = (await request.json())?.token;
  } catch {
    token = undefined;
  }

  const payload = await verifyMagicLinkToken(typeof token === 'string' ? token : null);
  const adminEmail = getAdminEmail();

  if (
    !payload ||
    !adminEmail ||
    payload.email.toLowerCase() !== adminEmail.toLowerCase() ||
    !markUsed(payload.nonce, payload.expiresAt)
  ) {
    return NextResponse.json(
      { error: 'This sign-in link has expired or already been used. Please ask for a new one.' },
      { status: 401 }
    );
  }

  const session: AdminSession = {
    user: { id: '1', email: adminEmail, role: 'admin', name: 'Orla Marie' },
    expiresAt: Date.now() + SESSION_DURATION_MS,
    sessionId: generateSessionId(),
  };

  const response = NextResponse.json({ success: true });
  response.cookies.set(
    SESSION_COOKIE,
    await createSessionToken(session),
    sessionCookieOptions(SESSION_DURATION_MS / 1000)
  );
  return response;
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
