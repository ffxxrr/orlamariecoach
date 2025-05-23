// Script to check and prepare media directories and files
const fs = require('fs');
const path = require('path');

// Define required directories
const requiredDirs = [
  'public/images/orla/optimized/about',
  'public/images/testimonials',
  'public/images/services',
  'public/media/audio/meditations'
];

// Define required image files (placeholders until real assets are available)
const requiredImages = [
  {
    dir: 'public/images/orla/optimized/about',
    files: ['portrait.webp', 'teaching.webp', '7R500125.webp']
  },
  {
    dir: 'public/images/testimonials',
    files: ['sarah.webp', 'michael.webp', 'emma.webp']
  },
  {
    dir: 'public/images/services',
    files: ['one-to-one.webp', 'group-course.webp', 'corporate.webp']
  }
];

// Define required audio files
const requiredAudio = [
  {
    dir: 'public/media/audio/meditations',
    files: ['irish-countryside-meditation.mp3', 'irish-countryside-meditation.ogg', 'irish-countryside-meditation.mp4']
  }
];

console.log('🔍 Checking project media directories and files...\n');

// Create missing directories
requiredDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${dir}`);
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

console.log('✅ All required directories exist\n');

// Check image files and create placeholders if missing
console.log('🖼️ Checking required image files:');
requiredImages.forEach(({ dir, files }) => {
  files.forEach(file => {
    const fullPath = path.join(process.cwd(), dir, file);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ Missing: ${path.join(dir, file)}`);
      // If real implementation, would create a placeholder image here
    } else {
      console.log(`✅ Found: ${path.join(dir, file)}`);
    }
  });
});

console.log('\n🎵 Checking audio files:');
requiredAudio.forEach(({ dir, files }) => {
  files.forEach(file => {
    const fullPath = path.join(process.cwd(), dir, file);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ Missing: ${path.join(dir, file)}`);
      if (file.endsWith('.mp3') || file.endsWith('.ogg')) {
        console.log(`   > Run 'node scripts/convert-audio.js' to generate this file`);
      }
    } else {
      const stats = fs.statSync(fullPath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ Found: ${path.join(dir, file)} (${fileSizeMB} MB)`);
    }
  });
});

console.log('\n📝 Media Status Summary:');
console.log('1. All required directories have been created');
console.log('2. Check warnings above for any missing files');
console.log('3. Run the audio conversion script to generate optimized formats');
console.log('\nNext steps:');
console.log('1. Add real images to replace any missing placeholder files');
console.log('2. Run "node scripts/convert-audio.js" to convert MP4 audio to MP3/OGG');
console.log('3. Update image paths in components if using different filenames');
