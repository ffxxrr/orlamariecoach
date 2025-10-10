import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear the session cookie
  response.cookies.set('admin_session', '', {
    maxAge: 0,
    httpOnly: true,
    secure: false, // Disable secure for localhost
    sameSite: 'lax', // Change from strict to lax
    path: '/' // Change from /admin to / for broader access
  });

  return response;
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}