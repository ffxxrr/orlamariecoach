// Session management using secure HTTP-only cookies and JWT
import jwt from 'jsonwebtoken';

export const AUTH_COOKIE_NAME = 'orlamarie_session_jwt'; // Renamed cookie
const JWT_SECRET = import.meta.env.PRIVATE_JWT_SECRET; // Ensure this is set in your .env file!

if (!JWT_SECRET) {
  console.error("FATAL ERROR: PRIVATE_JWT_SECRET environment variable is not set.");
  // In a real app, you might want to prevent startup or throw a more specific error.
  // For development, we'll log the error but allow it to continue, expecting it to fail later.
}

// Function to check if a user session JWT exists and is valid
export function checkAuthSession(Astro) {
  const token = Astro.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    // No session token found
    return null; // Return null or false to indicate no valid session
  }

  if (!JWT_SECRET) {
    console.error("JWT verification skipped: PRIVATE_JWT_SECRET is not set.");
    return null; // Cannot verify without secret
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);
    // If verification succeeds, return the decoded payload (e.g., { userId: '...' })
    console.log('Auth Check: JWT verified successfully.');
    return decoded; // Contains payload like { userId, iat, exp }
  } catch (error) {
    // If verification fails (e.g., invalid signature, expired token)
    console.warn(`Auth Check: JWT verification failed: ${error.message}`);
    // Clear the invalid cookie? Optional, but can prevent repeated checks.
    // Astro.cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
    return null; // Indicate invalid session
  }
}

// Function to create a session JWT cookie after successful login
export function createAuthSession(Astro, userId) {
  if (!JWT_SECRET) {
    console.error("JWT creation failed: PRIVATE_JWT_SECRET is not set.");
    // Potentially throw an error or return an indicator of failure
    return;
  }

  // Define the payload for the JWT
  const payload = {
    userId: userId,
    // Add other relevant non-sensitive info if needed
  };

  // Define JWT options (e.g., expiration time)
  const jwtOptions = {
    expiresIn: '7d', // Example: Token expires in 7 days
  };

  // Generate the signed JWT
  const token = jwt.sign(payload, JWT_SECRET, jwtOptions);

  // Define cookie options
  const cookieOptions = {
    httpOnly: true, // Prevent client-side JS access
    secure: import.meta.env.PROD, // Use secure cookies in production (HTTPS)
    path: '/', // Cookie available site-wide
    maxAge: 60 * 60 * 24 * 7, // 7 days validity (should match or exceed JWT expiry)
    sameSite: 'lax', // Protect against CSRF
  };

  // Set the JWT in the cookie
  Astro.cookies.set(AUTH_COOKIE_NAME, token, cookieOptions);
  console.log(`Auth Session: Created JWT session cookie for user: ${userId}`);
}

// Function to destroy a session cookie on logout
export function destroyAuthSession(Astro) {
  // Delete the session cookie
  Astro.cookies.delete(AUTH_COOKIE_NAME, { path: '/' });
  console.log('Auth Session: Destroyed session cookie.');
}
