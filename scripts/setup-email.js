// Set up email on this computer so blog drafts can be emailed for approval.
// Adds the mailbox settings to .env.local and opens it so the password can be
// pasted in by hand (it never needs to go through the Claude chat), then checks
// the mailbox accepts it.
//
// Usage:
//   npm run setup:email              # add settings if missing, open .env.local if the password is blank, then check
//   npm run setup:email -- --check   # only check the login
//
// Exit codes: 0 working, 1 login failed, 3 password still blank.

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const nodemailer = require('nodemailer');

const ENV_FILE = path.join(__dirname, '..', '.env.local');
const DEFAULTS = {
  SMTP_HOST: 'mail.privateemail.com',
  SMTP_PORT: '465',
  SMTP_USER: 'admin@orlamariecoach.com',
  SMTP_PASSWORD: '',
};

function readEnv() {
  const text = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '';
  const values = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) values[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return { text, values };
}

function addMissingSettings() {
  const { text, values } = readEnv();
  const missing = Object.keys(DEFAULTS).filter((k) => !(k in values));
  if (missing.length === 0) return;
  const lines = ['', '# Email (blog drafts and contact form). Paste the admin@ mailbox password after SMTP_PASSWORD=']
    .concat(missing.map((k) => `${k}=${DEFAULTS[k]}`));
  fs.writeFileSync(ENV_FILE, text.replace(/\s*$/, '') + lines.join('\n') + '\n');
  console.log(`Added ${missing.join(', ')} to .env.local`);
}

function openInEditor() {
  const cmd = process.platform === 'win32' ? 'notepad' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  const args = process.platform === 'darwin' ? ['-e', ENV_FILE] : [ENV_FILE];
  spawn(cmd, args, { detached: true, stdio: 'ignore' }).unref();
}

async function checkLogin() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = readEnv().values;
  if (!SMTP_PASSWORD) {
    console.log('The password is still blank. In the file that just opened, paste the admin@orlamariecoach.com');
    console.log('mailbox password straight after SMTP_PASSWORD= (no spaces or quotes), save it, close it,');
    console.log('then tell Claude "done" so it can check.');
    return 3;
  }
  const port = Number(SMTP_PORT || 465);
  try {
    await nodemailer
      .createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASSWORD } })
      .verify();
  } catch (err) {
    console.log(`The mailbox didn't accept the login (${err.code || err.message}).`);
    console.log('Check the password after SMTP_PASSWORD= in .env.local is exactly the one you use for webmail.');
    return 1;
  }
  console.log(`Email is working. Drafts will be sent from ${SMTP_USER}.`);
  return 0;
}

async function main(argv) {
  if (!argv.includes('--check')) {
    addMissingSettings();
    if (!readEnv().values.SMTP_PASSWORD) openInEditor();
  }
  return checkLogin();
}

main(process.argv.slice(2)).then((rc) => { process.exitCode = rc; });
