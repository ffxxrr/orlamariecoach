/**
 * Admin Authentication System
 * Simple session-based authentication for analytics dashboard
 */

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
  name: string;
}

export interface AuthSession {
  user: AdminUser;
  expiresAt: number;
  sessionId: string;
}

class AdminAuth {
  private readonly ADMIN_CREDENTIALS = {
    email: process.env.ADMIN_EMAIL || 'admin@orlamariecoach.com',
    password: process.env.ADMIN_PASSWORD || 'admin123!',
  };
  
  private readonly SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours
  private readonly SESSION_COOKIE = 'admin_session';

  /**
   * Authenticate admin user with email/password
   */
  public async authenticate(email: string, password: string): Promise<AuthSession | null> {
    // Simple credential check (in production, use proper password hashing)
    if (email === this.ADMIN_CREDENTIALS.email && password === this.ADMIN_CREDENTIALS.password) {
      const sessionId = this.generateSessionId();
      const session: AuthSession = {
        user: {
          id: '1',
          email: this.ADMIN_CREDENTIALS.email,
          role: 'admin',
          name: 'Orla Marie'
        },
        expiresAt: Date.now() + this.SESSION_DURATION,
        sessionId
      };

      return session;
    }

    return null;
  }

  /**
   * Validate session token
   */
  public async validateSession(sessionToken: string): Promise<AuthSession | null> {
    try {
      const session = this.decodeSessionToken(sessionToken);
      
      if (!session || session.expiresAt < Date.now()) {
        return null;
      }

      return session;
    } catch (error) {
      return null;
    }
  }

  /**
   * Create session token
   */
  public createSessionToken(session: AuthSession): string {
    return Buffer.from(JSON.stringify(session)).toString('base64');
  }

  /**
   * Decode session token
   */
  private decodeSessionToken(token: string): AuthSession | null {
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  /**
   * Generate secure session ID
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + 
           Date.now().toString(36) + 
           Math.random().toString(36).substring(2);
  }

  /**
   * Refresh session (extend expiry)
   */
  public refreshSession(session: AuthSession): AuthSession {
    return {
      ...session,
      expiresAt: Date.now() + this.SESSION_DURATION
    };
  }

  /**
   * Create session cookie options
   */
  public getSessionCookieOptions() {
    return {
      name: this.SESSION_COOKIE,
      maxAge: this.SESSION_DURATION / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/admin'
    };
  }
}

export default AdminAuth;