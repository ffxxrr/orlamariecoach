import { NextRequest, NextResponse } from 'next/server'
import { isEmailConfigured, sendEmail } from '@/lib/email'

/**
 * Email sign-up (free meditation + guide).
 *
 * Sign-ups go to MailerLite through its public embedded-form endpoint, so no API key is
 * needed. Set MAILERLITE_FORM_URL to the form's subscribe URL, e.g.
 *   https://assets.mailerlite.com/jsonp/<account id>/forms/<form id>/subscribe
 * (from the form's HTML embed code in MailerLite). The IDs are public, so they can live in code.
 * Orla also gets a notification email for each sign-up, which is the only record until
 * MailerLite is connected.
 */
const MAILERLITE_FORM_URL = ''

const MAX_PER_WINDOW = 5
const WINDOW_MS = 60 * 60 * 1000
const submissions = new Map<string, { count: number; firstAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = submissions.get(ip)
  if (!record || now - record.firstAt > WINDOW_MS) {
    submissions.set(ip, { count: 1, firstAt: now })
    return false
  }
  record.count++
  return record.count > MAX_PER_WINDOW
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

async function addToMailerLite(email: string, name: string): Promise<boolean> {
  if (!MAILERLITE_FORM_URL) return false
  const body = new URLSearchParams({
    'fields[email]': email,
    'fields[name]': name,
    'ml-submit': '1',
    anticsrf: 'true',
  })
  const res = await fetch(MAILERLITE_FORM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) return false
  const data = await res.json().catch(() => ({}))
  return data.success !== false
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never fill this in.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const email = clean(body.email, 200)
  const name = clean(body.name, 100)
  const source = clean(body.source, 50) || 'website'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Please tick the box to agree to receive emails.' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 })
  }

  let addedToList = false
  try {
    addedToList = await addToMailerLite(email, name)
  } catch (err) {
    console.error('MailerLite sign-up failed', err)
  }

  let notified = false
  if (isEmailConfigured()) {
    try {
      await sendEmail({
        subject: `New email sign-up: ${name || email}`,
        replyTo: email,
        text: [
          'Someone signed up for your free meditation and guide on orlamariecoach.com.',
          '',
          `Name: ${name || '(not given)'}`,
          `Email: ${email}`,
          `Signed up from: ${source}`,
          '',
          addedToList
            ? 'They have been added to your MailerLite list and will get the free gift automatically.'
            : 'MailerLite is not connected yet, so please send them the free meditation and guide yourself.',
        ].join('\n'),
      })
      notified = true
    } catch (err) {
      console.error('Sign-up notification failed', err)
    }
  }

  if (!addedToList && !notified) {
    return NextResponse.json(
      { error: 'Sorry, the sign-up could not be completed. Please email admin@orlamariecoach.com.' },
      { status: 503 },
    )
  }
  return NextResponse.json({ ok: true })
}
