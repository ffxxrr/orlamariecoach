import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session';

/**
 * Server-side gate for the admin area. Without this, the admin "auth" was
 * only a client-side redirect — every /api/admin/* endpoint was readable by
 * anyone. The matcher below sends all admin traffic through here.
 *
 * Public exceptions (no session required):
 *   - /admin/login            (the login page itself)
 *   - /api/admin/auth/login   (issues the session)
 *   - /api/admin/auth/logout  (clears it)
 *   - /api/admin/auth/session (reports auth state; returns 401 on its own)
 */
const PUBLIC_PATHS = new Set<string>([
  '/admin/login',
  '/api/admin/auth/login',
  '/api/admin/auth/logout',
  '/api/admin/auth/session',
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);

  if (session) {
    return NextResponse.next();
  }

  // Unauthenticated: APIs get a 401, pages get redirected to login.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
