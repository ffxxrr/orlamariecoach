import { checkAuthSession } from './session.js';

// Function to protect routes, typically called from middleware
// Accepts the Astro context object (includes cookies, request, etc.)
export function protectRoute(Astro) {
  // Check if the user has a valid session JWT
  const decodedToken = checkAuthSession(Astro); // Returns decoded payload or null

  if (!decodedToken) {
    // If no valid token (null), indicate authentication failed
    // The middleware will handle the actual redirect.
    console.log('Route Protection: User not authenticated (no valid JWT).');
    return false;
  }

  // If we have a valid decoded token, the user is authenticated.
  // We could potentially attach the decoded user info to Astro.locals here if needed downstream.
  // Example: Astro.locals.user = { id: decodedToken.userId };
  console.log(`Route Protection: User authenticated (JWT valid for userId: ${decodedToken.userId}).`);
  return true; // Indicate authentication succeeded
}

// Optional: Add role-based protection if needed later
// export function protectAdminRoute(request) {
//   const isAuthenticated = checkAuthSession(request);
//   if (!isAuthenticated) return false;
//
//   const userRole = getUserRoleFromSession(request); // Needs implementation
//   if (userRole !== 'admin') {
//     console.log('Admin Route Protection: User is not an admin.');
//     return false; // Indicate authorization failed
//   }
//
//   return true; // Indicate success
// }
