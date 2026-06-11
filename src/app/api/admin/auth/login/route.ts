import { NextRequest, NextResponse } from 'next/server';
import {
  AdminSession,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  createSessionToken,
  generateSessionId,
  sessionCookieOptions,
} from '@/lib/auth/session';

/**
 * Resolve admin credentials from the environment. Fails closed: if the env
 * vars are missing in production we refuse all logins rather than falling
 * back to a hardcoded default.
 */
function getAdminCredentials(): { email: string; password: string } | null {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (email && password) {
    return { email, password };
  }

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  // Development convenience only — never reached in production.
  return { email: 'admin@orlamariecoach.com', password: 'admin123!' };
}

/** Constant-time string comparison to avoid leaking length/content via timing. */
function timingSafeEqual(a: string, b: string): boolean {
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  const len = Math.max(aBytes.length, bBytes.length);
  let mismatch = aBytes.length ^ bBytes.length;
  for (let i = 0; i < len; i++) {
    mismatch |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  }
  return mismatch === 0;
}

// Per-IP login throttling (in-memory; resets on restart / per instance).
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const attempts = new Map<string, { count: number; firstAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function isLockedOut(ip: string): boolean {
  const record = attempts.get(ip);
  if (!record) return false;
  if (Date.now() - record.firstAt > LOCKOUT_MS) {
    attempts.delete(ip);
    return false;
  }
  return record.count >= MAX_ATTEMPTS;
}

function recordFailure(ip: string): void {
  const record = attempts.get(ip);
  if (!record || Date.now() - record.firstAt > LOCKOUT_MS) {
    attempts.set(ip, { count: 1, firstAt: Date.now() });
  } else {
    record.count += 1;
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isLockedOut(ip)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const credentials = getAdminCredentials();
    if (!credentials) {
      console.error('Admin login attempted but ADMIN_EMAIL/ADMIN_PASSWORD are not configured');
      return NextResponse.json(
        { error: 'Admin login is not configured' },
        { status: 503 }
      );
    }

    const emailMatches = timingSafeEqual(
      String(email).toLowerCase(),
      credentials.email.toLowerCase()
    );
    const passwordMatches = timingSafeEqual(String(password), credentials.password);

    if (!emailMatches || !passwordMatches) {
      recordFailure(ip);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    attempts.delete(ip);

    const session: AdminSession = {
      user: {
        id: '1',
        email: credentials.email,
        role: 'admin',
        name: 'Orla Marie',
      },
      expiresAt: Date.now() + SESSION_DURATION_MS,
      sessionId: generateSessionId(),
    };

    const token = await createSessionToken(session);

    const response = NextResponse.json({ success: true, user: session.user });
    response.cookies.set(
      SESSION_COOKIE,
      token,
      sessionCookieOptions(SESSION_DURATION_MS / 1000)
    );
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
