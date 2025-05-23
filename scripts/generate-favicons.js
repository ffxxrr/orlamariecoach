#!/usr/bin/env node
/**
 * Favicon Generator Script
 * Converts the SVG favicon to multiple formats for broad browser support
 * 
 * Requires: sharp (npm install sharp)
 * Usage: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FAVICON_DIR = 'public/images/brand/favicon';
const SVG_SOURCE = path.join(FAVICON_DIR, 'favicon.svg');

// Favicon configurations
const faviconConfigs = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from SVG...');
  
  // Check if source SVG exists
  if (!fs.existsSync(SVG_SOURCE)) {
    console.error(`❌ Source SVG not found: ${SVG_SOURCE}`);
    process.exit(1);
  }

  // Create favicon directory if it doesn't exist
  if (!fs.existsSync(FAVICON_DIR)) {
    fs.mkdirSync(FAVICON_DIR, { recursive: true });
  }

  try {
    // Generate PNG favicons
    for (const config of faviconConfigs) {
      const outputPath = path.join(FAVICON_DIR, config.name);
      
      await sharp(SVG_SOURCE)
        .resize(config.size, config.size)
        .png({ quality: 90 })
        .toFile(outputPath);
      
      console.log(`✅ Generated: ${config.name} (${config.size}x${config.size})`);
    }

    // Generate ICO file (legacy support)
    const icoPath = path.join(FAVICON_DIR, 'favicon.ico');
    await sharp(SVG_SOURCE)
      .resize(32, 32)
      .png()
      .toFile(icoPath.replace('.ico', '.png'));
    
    // Rename to .ico (sharp doesn't support ICO format directly)
    fs.renameSync(icoPath.replace('.ico', '.png'), icoPath);
    console.log('✅ Generated: favicon.ico (32x32)');

    // Generate web app manifest
    const manifest = {
      name: "OrlaMarieCoach",
      short_name: "OrlaCoach",
      description: "Find Your Inner Peace Through Authentic Meditation",
      icons: [
        {
          src: "/images/brand/favicon/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/images/brand/favicon/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      theme_color: "#79b98a",
      background_color: "#f8fffe",
      display: "standalone",
      start_url: "/"
    };

    fs.writeFileSync(
      path.join('public', 'site.webmanifest'), 
      JSON.stringify(manifest, null, 2)
    );
    console.log('✅ Generated: site.webmanifest');

    console.log('\n🎉 Favicon generation complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Add favicon links to your HTML <head>');
    console.log('2. Test favicons in different browsers');
    console.log('3. Verify PWA manifest is working');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  generateFavicons();
}

module.exports = { generateFavicons };
