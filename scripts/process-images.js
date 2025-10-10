// Script to copy selected images for services and courses
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Source images
const sourcePath = path.join(__dirname, 'public', 'images', 'orla', 'raw');

// Destination paths
const servicesPath = path.join(__dirname, 'public', 'images', 'services');
const coursesPath = path.join(__dirname, 'public', 'images', 'content', 'courses');

// Make sure destination directories exist
if (!fs.existsSync(servicesPath)) {
  fs.mkdirSync(servicesPath, { recursive: true });
}

if (!fs.existsSync(coursesPath)) {
  fs.mkdirSync(coursesPath, { recursive: true });
}

// Images for services
const serviceImages = {
  'one-to-one.webp': '7R500125.jpg', // Orla in meditation posture
  'group-course.webp': '7R500362.jpg', // Group setting image
  'corporate.webp': '7R500169.jpg', // Professional looking image
};

// Images for courses
const courseImages = {
  'foundations.webp': '7R500130.jpg', // Beginner-friendly image
  'deepening.webp': '7R500325.jpg', // More advanced meditation pose
  'daily-life.webp': '7R500406.jpg', // Practical application image
};

// Process service images
Object.entries(serviceImages).forEach(([destName, sourceName]) => {
  const sourceFull = path.join(sourcePath, sourceName);
  const destFull = path.join(servicesPath, destName);
  
  if (fs.existsSync(sourceFull)) {
    sharp(sourceFull)
      .resize(800, 600, { fit: 'cover' })
      .toFormat('webp', { quality: 80 })
      .toFile(destFull)
      .then(() => console.log(`Processed ${sourceName} to ${destName}`))
      .catch(err => console.error(`Error processing ${sourceName}:`, err));
  } else {
    console.error(`Source file not found: ${sourceFull}`);
  }
});

// Process course images
Object.entries(courseImages).forEach(([destName, sourceName]) => {
  const sourceFull = path.join(sourcePath, sourceName);
  const destFull = path.join(coursesPath, destName);
  
  if (fs.existsSync(sourceFull)) {
    sharp(sourceFull)
      .resize(800, 600, { fit: 'cover' })
      .toFormat('webp', { quality: 80 })
      .toFile(destFull)
      .then(() => console.log(`Processed ${sourceName} to ${destName}`))
      .catch(err => console.error(`Error processing ${sourceName}:`, err));
  } else {
    console.error(`Source file not found: ${sourceFull}`);
  }
});

console.log('Image processing script completed');
