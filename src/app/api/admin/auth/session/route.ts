import { NextRequest, NextResponse } from 'next/server';
import {
  AdminSession,
  SESSION_COOKIE,
  SESSION_DURATION_MS,
  createSessionToken,
  sessionCookieOptions,
  verifySessionToken,
} from '@/lib/auth/session';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = await verifySessionToken(token);

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Refresh (sliding expiry) and re-sign.
    const refreshed: AdminSession = {
      ...session,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    const newToken = await createSessionToken(refreshed);

    const response = NextResponse.json({
      authenticated: true,
      user: session.user,
    });
    response.cookies.set(
      SESSION_COOKIE,
      newToken,
      sessionCookieOptions(SESSION_DURATION_MS / 1000)
    );
    return response;
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
