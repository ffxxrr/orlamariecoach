// Simple script to hash a password using bcrypt
// Usage: node scripts/hash-password.mjs YOUR_PASSWORD_HERE

import bcrypt from 'bcrypt';
import { EOL } from 'os'; // Import EOL for cross-platform line breaks

const password = process.argv[2];

if (!password) {
  console.error('Error: Please provide a password as an argument.');
  console.log('Usage: node scripts/hash-password.mjs YOUR_PASSWORD_HERE');
  process.exit(1);
}

const saltRounds = 10; // Recommended salt rounds

console.log('Generating password hash...');

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    process.exit(1);
  }
  console.log(EOL + 'Password hashing complete.' + EOL);
  console.log('Copy the following lines into your app/.env file:'); // Updated path hint
  console.log('-------------------------------------------');
  console.log(`PRIVATE_ADMIN_USERNAME=your_chosen_admin_username`); // Use PRIVATE_ prefix
  console.log(`PRIVATE_ADMIN_PASSWORD_HASH=${hash}`); // Use PRIVATE_ prefix
  console.log('-------------------------------------------' + EOL);
});
