#!/usr/bin/env node

/**
 * Orla Image Optimization Script
 * Converts high-res images to web-optimized formats and sizes
 * Requires: npm install sharp
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.log('⚠️  Sharp not installed. Run: npm install sharp');
  console.log('   This script will create placeholder optimization commands.');
}

const sourceDir = path.join(__dirname, '..', 'public', 'images', 'orla', 'raw', 'orla selection');
const outputDir = path.join(__dirname, '..', 'public', 'images', 'orla', 'optimized');

// Image size configurations for different use cases
const imageConfigs = {
  hero: { width: 1920, height: 1080, quality: 85 },
  about: { width: 800, height: 800, quality: 80 },
  service: { width: 1200, height: 800, quality: 80 },
  thumbnail: { width: 400, height: 400, quality: 75 },
  mobile: { width: 768, height: 1024, quality: 75 }
};

// Ensure output directories exist
Object.keys(imageConfigs).forEach(category => {
  const categoryDir = path.join(outputDir, category);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }
});

const imageFiles = fs.readdirSync(sourceDir)
  .filter(file => file.toLowerCase().endsWith('.jpg'));

console.log('🔧 Optimizing Orla\'s Images for Web');
console.log('====================================\n');

if (!sharp) {
  console.log('📝 Optimization Commands (run after installing sharp):');
  console.log('=====================================================');
  
  imageFiles.forEach(file => {
    const baseName = path.parse(file).name;
    Object.entries(imageConfigs).forEach(([category, config]) => {
      console.log(`// ${category}: ${file}`);
      console.log(`sharp('${sourceDir}/${file}')`);
      console.log(`  .resize(${config.width}, ${config.height}, { fit: 'cover', position: 'center' })`);
      console.log(`  .webp({ quality: ${config.quality} })`);
      console.log(`  .toFile('${outputDir}/${category}/${baseName}.webp');`);
      console.log('');
    });
  });
  return;
}

// If sharp is available, process images
async function optimizeImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(sourceDir, file);
    const baseName = path.parse(file).name;
    
    console.log(`📸 Processing: ${file}`);
    
    for (const [category, config] of Object.entries(imageConfigs)) {
      const outputPath = path.join(outputDir, category, `${baseName}.webp`);
      
      try {
        await sharp(inputPath)
          .resize(config.width, config.height, { 
            fit: 'cover', 
            position: 'center' 
          })
          .webp({ quality: config.quality })
          .toFile(outputPath);
        
        const stats = fs.statSync(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`   ✓ ${category}: ${sizeKB}KB`);
      } catch (error) {
        console.log(`   ✗ ${category}: Error - ${error.message}`);
      }
    }
    console.log('');
  }
  
  console.log('✅ Optimization complete!');
}

if (sharp) {
  optimizeImages().catch(console.error);
}
