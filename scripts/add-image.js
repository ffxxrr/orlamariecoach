// Resize a photo and save it as .webp for the site. Works on Windows and macOS.
// Usage: node scripts/add-image.js <source photo> <public/images/... .webp> [max width, default 1600]
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const [source, dest, width = '1600'] = process.argv.slice(2);

if (!source || !dest || !dest.endsWith('.webp')) {
  console.error('Usage: node scripts/add-image.js <source photo> <public/images/... .webp> [max width]');
  process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });

sharp(source)
  .rotate() // respect phone camera orientation
  .resize({ width: Number(width), withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(dest)
  .then((info) => console.log(`Saved ${dest} (${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB)`))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
