// Shared email sending for the blog scripts. Uses the contact form mailbox (SMTP_* in .env.local).

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Exit code the scripts use when email isn't set up on this computer
const NOT_CONFIGURED = 3;

function loadEnvFile(file = path.join(__dirname, '..', '.env.local')) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || process.env[m[1]] !== undefined) continue;
    process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

/** Sends to BLOG_DRAFT_EMAIL, else CONTACT_TO_EMAIL, else SMTP_USER. Returns the address, or null if not configured. */
async function sendToOrla({ subject, html, text }) {
  loadEnvFile();
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, BLOG_DRAFT_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  const port = Number(SMTP_PORT || 465);
  const to = BLOG_DRAFT_EMAIL || CONTACT_TO_EMAIL || SMTP_USER;
  await nodemailer
    .createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASSWORD } })
    .sendMail({ from: `"Orla Marie Coach blog" <${SMTP_USER}>`, to, subject, html, text });
  return to;
}

const NOT_CONFIGURED_MESSAGE =
  'Email is not set up on this computer: SMTP_HOST, SMTP_USER and SMTP_PASSWORD are missing from .env.local. Ask Conal.';

module.exports = { sendToOrla, NOT_CONFIGURED, NOT_CONFIGURED_MESSAGE };
