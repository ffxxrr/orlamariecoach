import { NextRequest, NextResponse } from 'next/server';

const ADMIN_CREDENTIALS = {
  email: 'admin@orlamariecoach.com',
  password: 'admin123!',
};

export async function POST(request: NextRequest) {
  console.log('POST request received');
  
  try {
    console.log('Parsing request body...');
    const body = await request.json();
    console.log('Body parsed:', body);
    
    const { email, password } = body;
    console.log('Credentials extracted:', { email, passwordLength: password?.length });

    if (!email || !password) {
      console.log('Missing credentials');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    console.log('Checking credentials against:', ADMIN_CREDENTIALS.email);
    
    // Simple credential check
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      console.log('Credentials valid, creating session...');
      
      // Create session data
      const session = {
        user: {
          id: '1',
          email: ADMIN_CREDENTIALS.email,
          role: 'admin' as const,
          name: 'Orla Marie'
        },
        expiresAt: Date.now() + (8 * 60 * 60 * 1000), // 8 hours
        sessionId: Math.random().toString(36).substring(2) + Date.now().toString(36)
      };

      console.log('Session created, encoding token...');
      
      // Create session token (simple base64 encoding for now)
      const sessionToken = Buffer.from(JSON.stringify(session)).toString('base64');

      console.log('Token created, setting cookie...');
      
      // Set session cookie
      const response = NextResponse.json({
        success: true,
        user: session.user
      });

      response.cookies.set('admin_session', sessionToken, {
        maxAge: 8 * 60 * 60, // 8 hours in seconds
        httpOnly: true,
        secure: false, // Disable secure for localhost
        sameSite: 'lax', // Change from strict to lax
        path: '/' // Change from /admin to / for broader access
      });

      console.log('Response ready, returning...');
      return response;
    } else {
      console.log('Invalid credentials provided');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}