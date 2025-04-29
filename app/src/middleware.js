// Removed dotenv imports and loading logic
import { protectRoute } from './utils/auth/protect.js'; // Import the protection logic

// Middleware runs on every request
// Export onRequest directly, Astro detects it. Add 'cookies' and 'locals' to context.
export async function onRequest({ request, redirect, url, cookies, locals }, next) {
  // Removed population of locals.ADMIN_USERNAME/HASH

  // Define paths that should be protected
  const protectedPrefix = '/admin';
  const loginPath = '/admin/login';

  // Check if the requested path starts with the protected prefix
  if (url.pathname.startsWith(protectedPrefix)) {
    // Allow access to the login page itself without authentication
    if (url.pathname === loginPath) {
      return next(); // Proceed to the login page
    }

    // For all other /admin/* routes, check authentication
    // Pass the Astro context object with cookies
    // Reverted passing locals to protectRoute unless it specifically needs it
    const isAuthenticated = protectRoute({ request, cookies, url });

    if (!isAuthenticated) {
      // If not authenticated, redirect to the login page
      console.log(`Middleware: Redirecting unauthenticated request for ${url.pathname} to ${loginPath}`);
      return redirect(loginPath);
    }
    // If authenticated, proceed to the requested admin page
    console.log(`Middleware: Allowing authenticated request for ${url.pathname}`);
  }

  // For all non-admin routes, or authenticated admin routes, proceed normally
  return next();
}
