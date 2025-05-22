// src/pages/api/admin/signout.js - (Previously logout.js)
import { AUTH_COOKIE_NAME } from '../../../utils/auth/session'; // Import the cookie name

export async function GET({ cookies, redirect }) {
  // Clear the authentication cookie
  cookies.delete(AUTH_COOKIE_NAME, {
    path: '/', // Ensure the cookie is cleared for the whole site
  });
  console.log(`Signout: Cleared cookie ${AUTH_COOKIE_NAME}`);
  // Redirect to the login page
  return redirect('/admin/login', 302); // Use 302 for temporary redirect
}

// Optional: Handle POST requests if needed, though GET is common for logout/signout
export async function POST({ cookies, redirect }) {
    // Clear the authentication cookie
    cookies.delete(AUTH_COOKIE_NAME, {
      path: '/',
    });
    console.log(`Signout (POST): Cleared cookie ${AUTH_COOKIE_NAME}`);
    // Redirect to the login page
    return redirect('/admin/login', 302);
}
