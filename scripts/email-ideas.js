// Email Orla the week's blog ideas so she can pick one.
// The ideas are a markdown file written by the Monday routine (kept in private/, not in the repo).
//
// Usage:
//   node scripts/email-ideas.js private/blog-ideas/<date>.md "<subject>"
//   node scripts/email-ideas.js private/blog-ideas/<date>.md "<subject>" --preview out.html
//
// Exit codes: 0 sent, 1 error, 3 email isn't set up on this computer (run npm run setup:email).

const fs = require('fs');
const { marked } = require('marked');
const { sendToOrla, NOT_CONFIGURED, NOT_CONFIGURED_MESSAGE } = require('./mailer');

function buildEmail(markdown, subject) {
  const bodyHtml = marked.parse(markdown, { async: false })
    .replace(/<h1>/g, '<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:28px;margin:0 0 16px;">')
    .replace(/<h2>/g, '<h2 style="font-family:Georgia,serif;color:#56140F;font-weight:normal;font-size:22px;margin:28px 0 6px;">');

  const html = `<!doctype html>
<html><body style="margin:0;background:#FFFCF1;">
<div style="max-width:640px;margin:0 auto;padding:24px 20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:#000;">
  ${bodyHtml}
  <p style="background:#F1CBB8;padding:14px 16px;border-radius:6px;margin-top:28px;font-size:15px;">
    To choose, open the Claude app and say which one (for example <strong>"blog idea 2"</strong>), plus any news
    you'd like in it. (Replying to this email won't reach Claude.)
  </p>
</div>
</body></html>`;

  const text = `${markdown.trim()}

To choose, open the Claude app and say which one (for example "blog idea 2"), plus any news you'd like in it.
`;
  return { subject, html, text };
}

async function main(argv) {
  const [file, subject] = argv;
  if (!file || !subject) {
    console.error('Usage: node scripts/email-ideas.js <ideas.md> "<subject>" [--preview out.html]');
    return 1;
  }

  const email = buildEmail(fs.readFileSync(file, 'utf8'), subject);
  const previewIdx = argv.indexOf('--preview');
  if (previewIdx !== -1) {
    fs.writeFileSync(argv[previewIdx + 1] || 'ideas-preview.html', email.html);
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
