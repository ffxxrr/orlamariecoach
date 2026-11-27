/**
 * The one admin account's email address. Production must set ADMIN_EMAIL;
 * development falls back to the documented dev account.
 */
export function getAdminEmail(): string | null {
  const email = process.env.ADMIN_EMAIL;
  if (email) return email;
  if (process.env.NODE_ENV === 'production') return null;
  return 'admin@orlamariecoach.com';
}
