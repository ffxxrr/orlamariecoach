// Email a blog draft to Orla for approval, with the full post and a link to it on staging.
// Uses the same mailbox as the contact form (SMTP_* in .env.local on this computer).
//
// Usage:
//   node scripts/email-draft.js content/blog/<post>.md
//   node scripts/email-draft.js content/blog/<post>.md --preview out.html   # write the email to a file, don't send
//
// Sends to BLOG_DRAFT_EMAIL, else CONTACT_TO_EMAIL, else SMTP_USER.
// Exit codes: 0 sent, 1 error, 3 email isn't set up on this computer (ask Conal).

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { sendToOrla, NOT_CONFIGURED, NOT_CONFIGURED_MESSAGE } = require('./mailer');

const STAGING_URL = 'https://orlamariecoach.vercel.app';

function parsePost(file) {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const data = {};
  for (const line of (match ? match[1] : '').split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) data[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
  }
  const slug = path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  return { ...data, slug, body: match ? match[2] : raw };
}

function buildEmail(post) {
  const url = `${STAGING_URL}/blog/${post.slug}`;
  const day = new Date(`${post.date}T12:00:00Z`).toLocaleDateString('en-IE', {
    weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Dublin',
  });
  const bodyHtml = marked.parse(post.body, { async: false })
    .replace(/<h2>/g, '<h2 style="font-family:Georgia,serif;color:#56140F;font-weight:normal;font-size:24px;margin:28px 0 8px;">')
    .replace(/<blockquote>/g, '<blockquote style="border-left:2px solid #C9A475;margin:20px 0;padding-left:16px;font-family:Georgia,serif;font-style:italic;color:#6E5A2F;">');

  const subject = `Blog draft for ${day}: ${post.title}`;
  const html = `<!doctype html>
<html><body style="margin:0;background:#FFFCF1;">
<div style="max-width:640px;margin:0 auto;padding:24px 20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:#000;">
  <p style="background:#F1CBB8;padding:14px 16px;border-radius:6px;margin:0 0 24px;font-size:15px;">
    Here's next week's draft, due to go out on <strong>${day}</strong> at 7am.<br>
    <a href="${url}" style="color:#56140F;">See it on the staging site</a>. When you're happy, open the Claude app and say
    <strong>"publish"</strong>, or tell Claude what to change. (Replying to this email won't reach Claude.)
  </p>
  ${post.image ? `<img src="${STAGING_URL}${post.image}" alt="${post.imageAlt || ''}" width="600" style="width:100%;height:auto;border-radius:6px;margin-bottom:20px;">` : ''}
  <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:30px;line-height:1.25;margin:0 0 8px;">${post.title}</h1>
  <p style="color:#6E5A2F;font-size:14px;margin:0 0 24px;"><em>Preview text on Google and social media:</em> ${post.description || ''}</p>
  ${bodyHtml}
</div>
</body></html>`;

  const text = `Blog draft for ${day} at 7am: ${post.title}

Read it on the staging site: ${url}
When you're happy, open the Claude app and say "publish", or tell Claude what to change.

${post.body.trim()}
`;
  return { subject, html, text };
}

async function main(argv) {
  const file = argv.find((a) => a.endsWith('.md'));
  const previewIdx = argv.indexOf('--preview');
  if (!file) {
    console.error('Usage: node scripts/email-draft.js content/blog/<post>.md [--preview out.html]');
    return 1;
  }

  const email = buildEmail(parsePost(file));
  if (previewIdx !== -1) {
    fs.writeFileSync(argv[previewIdx + 1] || 'email-preview.html', email.html);
    console.log(`Preview written. Subject: ${email.subject}`);
    return 0;
  }

  const to = await sendToOrla(email);
  if (!to) {
    console.error(NOT_CONFIGURED_MESSAGE);
    return NOT_CONFIGURED;
  }
  console.log(`Sent "${email.subject}" to ${to}`);
  return 0;
}

main(process.argv.slice(2)).then(
  (rc) => { process.exitCode = rc; },
  (err) => { console.error(err.message); process.exitCode = 1; },
);
