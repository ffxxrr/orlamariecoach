import nodemailer from 'nodemailer'

/**
 * Sends mail through the Namecheap Private Email mailbox (admin@orlamariecoach.com).
 * Configured from SMTP_* env vars; returns null when they're missing.
 */
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null

  const port = Number(SMTP_PORT || 465)
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })
}

export function isEmailConfigured(): boolean {
  return getTransport() !== null
}

export async function sendEmail(options: {
  subject: string
  text: string
  replyTo?: string
}): Promise<void> {
  const transport = getTransport()
  if (!transport) throw new Error('SMTP is not configured')

  const from = process.env.SMTP_USER as string
  await transport.sendMail({
    from: `"orlamariecoach.com" <${from}>`,
    to: process.env.CONTACT_TO_EMAIL || from,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
  })
}
