import { NextResponse } from 'next/server';
import { SESSION_COOKIE, sessionCookieOptions } from '@/lib/auth/session';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the session cookie (same attributes as when set, maxAge 0).
  response.cookies.set(SESSION_COOKIE, '', sessionCookieOptions(0));

  return response;
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
