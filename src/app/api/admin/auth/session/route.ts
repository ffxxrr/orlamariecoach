import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Decode session token
    let session;
    try {
      const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
      session = JSON.parse(decoded);
    } catch {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Check if session is expired
    if (!session || session.expiresAt < Date.now()) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Refresh session (extend expiry)
    const refreshedSession = {
      ...session,
      expiresAt: Date.now() + (8 * 60 * 60 * 1000) // 8 hours
    };

    const newSessionToken = Buffer.from(JSON.stringify(refreshedSession)).toString('base64');

    const response = NextResponse.json({
      authenticated: true,
      user: session.user
    });

    // Update session cookie
    response.cookies.set('admin_session', newSessionToken, {
      maxAge: 8 * 60 * 60, // 8 hours in seconds
      httpOnly: true,
      secure: false, // Disable secure for localhost
      sameSite: 'lax', // Change from strict to lax
      path: '/' // Change from /admin to / for broader access
    });

    return response;
  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}