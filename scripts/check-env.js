const fs = require('fs');
const path = require('path');

function hasDatabaseUrl(envPath) {
  if (!fs.existsSync(envPath)) return false;
  const content = fs.readFileSync(envPath, 'utf8');
  return /DATABASE_URL\s*=/.test(content);
}

const envPath = path.resolve(process.cwd(), '.env');
const hasEnv = fs.existsSync(envPath);
const hasUrl = hasDatabaseUrl(envPath);

if (!hasEnv || !hasUrl) {
  console.error('\n[Prisma Setup] Missing DATABASE_URL in .env');
  console.error('Create .env from .env.example and set DATABASE_URL.');
  console.error('Example: postgresql://orla:orla@localhost:5432/orla_dev?schema=public\n');
  process.exit(1);
}

console.log('[Prisma Setup] .env found with DATABASE_URL');
