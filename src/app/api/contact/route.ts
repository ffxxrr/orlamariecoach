import { NextRequest, NextResponse } from 'next/server'
import { isEmailConfigured, sendEmail } from '@/lib/email'

// Keep in sync with the enquiry options in ContactForm.tsx
const INQUIRY_LABELS: Record<string, string> = {
  'one-to-one': 'One-to-one mindfulness',
  workplace: 'Workplace programme',
  schools: 'Schools programme',
  other: 'General question',
}

const EXPERIENCE_LABELS: Record<string, string> = {
  beginner: 'Complete beginner',
  some: 'Some experience',
  regular: 'Regular practitioner',
  experienced: 'Experienced',
}

// Per-IP throttling (in-memory; resets on restart / per instance).
const MAX_PER_WINDOW = 5
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const submissions = new Map<string, { count: number; firstAt: number }>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

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

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const firstName = clean(body.firstName, 100)
  const lastName = clean(body.lastName, 100)
  const email = clean(body.email, 200)
  const message = clean(body.message, 5000)
  const inquiryType = INQUIRY_LABELS[clean(body.inquiryType, 50)] || 'Not specified'
  const experience = EXPERIENCE_LABELS[clean(body.experience, 50)] || 'Not specified'
  const newsletter = body.newsletter === true

  if (!firstName || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please fill in your name, email and message.' }, { status: 400 })
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 })
  }

  const name = [firstName, lastName].filter(Boolean).join(' ')
  const text = [
    `New message from the contact form on orlamariecoach.com`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Enquiry: ${inquiryType}`,
    `Experience: ${experience}`,
    `Newsletter: ${newsletter ? 'Yes, please add me' : 'No'}`,
    ``,
    message,
    ``,
    `Reply to this email to answer ${firstName} directly.`,
  ].join('\n')

  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact] SMTP not configured; message not sent:\n' + text)
      return NextResponse.json({ ok: true })
    }
    console.error('[contact] SMTP not configured. Lost message:\n' + text)
    return NextResponse.json({ error: 'Email is not available right now.' }, { status: 503 })
  }

  try {
    await sendEmail({ subject: `Website enquiry from ${name}: ${inquiryType}`, text, replyTo: email })
    return NextResponse.json({ ok: true })
  } catch (error) {
    // Log the full message so it can be recovered from the server logs.
    console.error('[contact] Failed to send:', error, '\nMessage:\n' + text)
    return NextResponse.json({ error: 'Your message could not be sent.' }, { status: 502 })
  }
}
