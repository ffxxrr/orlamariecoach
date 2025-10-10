// convert-audio.js
// Script to convert audio files to web-optimized formats using ffmpeg
// Usage: node convert-audio.js

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Source file path
const sourceFile = path.join(__dirname, '../public/media/audio/meditations/irish-countryside-meditation.mp4');
const outputDir = path.join(__dirname, '../public/media/audio/meditations');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Convert to MP3 (high quality, but smaller file size)
const mp3Output = path.join(outputDir, 'irish-countryside-meditation.mp3');
console.log(`Converting to MP3: ${mp3Output}`);
exec(`ffmpeg -i "${sourceFile}" -vn -ab 128k -ar 44100 -f mp3 "${mp3Output}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`MP3 conversion error: ${error.message}`);
    return;
  }
  console.log('MP3 conversion completed successfully');
});

// Convert to OGG (alternative format for better browser compatibility)
const oggOutput = path.join(outputDir, 'irish-countryside-meditation.ogg');
console.log(`Converting to OGG: ${oggOutput}`);
exec(`ffmpeg -i "${sourceFile}" -vn -c:a libvorbis -q:a 4 "${oggOutput}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`OGG conversion error: ${error.message}`);
    return;
  }
  console.log('OGG conversion completed successfully');
});

console.log('Audio conversion process started. This may take a few moments...');
