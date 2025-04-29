// src/pages/api/admin/logout.js - Simplified for testing

// Removed import { AUTH_COOKIE_NAME } from '../../../utils/auth/session';

export async function GET({ redirect }) {
  console.log("--- Reached Simplified /api/admin/logout GET handler ---");
  // Just redirect for now, without touching cookies
  return redirect('/admin/login?logout=success', 302); // Added query param for visibility
}

export async function POST({ redirect }) {
  console.log("--- Reached Simplified /api/admin/logout POST handler ---");
   // Just redirect for now, without touching cookies
  return redirect('/admin/login?logout=success_post', 302);
}
