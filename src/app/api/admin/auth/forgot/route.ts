import { NextRequest, NextResponse } from 'next/server';
import { createMagicLinkToken } from '@/lib/auth/session';
import { getAdminEmail } from '@/lib/auth/admin-email';
import { isEmailConfigured, sendEmail } from '@/lib/email';

/**
 * "Forgot password?" — emails a one-time sign-in link to the admin inbox.
 *
 * Takes no input: the link only ever goes to ADMIN_EMAIL, so asking for it
 * can't send anything anywhere else. Requests are throttled per IP and
 * overall so the button can't be used to flood the inbox.
 */

const PER_IP_LIMIT = 3;
const PER_IP_WINDOW_MS = 15 * 60 * 1000;
const GLOBAL_LIMIT = 10;
const GLOBAL_WINDOW_MS = 60 * 60 * 1000;

const ipRequests = new Map<string, number[]>();
let globalRequests: number[] = [];

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (ipRequests.get(ip) || []).filter((t) => now - t < PER_IP_WINDOW_MS);
  globalRequests = globalRequests.filter((t) => now - t < GLOBAL_WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT || globalRequests.length >= GLOBAL_LIMIT) {
    ipRequests.set(ip, recent);
    return false;
  }
  recent.push(now);
  ipRequests.set(ip, recent);
  globalRequests.push(now);
  return true;
}

/**
 * Where the link points. Never built from the request's Host header in
 * production (that could be spoofed to send the link to another site).
 */
function siteUrl(request: NextRequest): string {
  if (process.env.NODE_ENV !== 'production') return request.nextUrl.origin;
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://orlamariecoach.vercel.app').replace(/\/+$/, '');
}

export async function POST(request: NextRequest) {
  if (!allow(getClientIp(request))) {
    return NextResponse.json(
      { error: 'A link was sent recently. Please check your inbox, or try again later.' },
      { status: 429 }
    );
  }

  const adminEmail = getAdminEmail();
  if (!adminEmail || !isEmailConfigured()) {
    console.error('[forgot] ADMIN_EMAIL or SMTP is not configured');
    return NextResponse.json(
      { error: 'Email sign-in is not set up on this site.' },
      { status: 503 }
    );
  }

  try {
    const token = await createMagicLinkToken(adminEmail);
    const link = `${siteUrl(request)}/admin/login?link=${encodeURIComponent(token)}`;
    await sendEmail({
      to: adminEmail,
      subject: 'Your sign-in link for the orlamariecoach.com dashboard',
      text: [
        'Hi Orla,',
        '',
        'Here is your link to sign in to your website dashboard:',
        '',
        link,
        '',
        'It works once, for the next 15 minutes.',
        '',
        "If you didn't ask for this, you can ignore this email. Nobody can sign in without the link.",
      ].join('\n'),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[forgot] Failed to send sign-in link:', error);
    return NextResponse.json(
      { error: 'Sorry, the email could not be sent. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
