# Public Assets Directory

This directory contains static assets that are served directly to the browser.

## Structure

```
public/
├── images/           # Static images (logos, backgrounds, etc.)
├── icons/           # Favicon and app icons
├── fonts/           # Custom fonts (if any)
├── analytics.js     # Custom analytics tracking script
├── robots.txt       # SEO robots file
└── sitemap.xml      # Site sitemap (generated)
```

## Guidelines

### Images
- Optimize all images for web (WebP format preferred)
- Use descriptive filenames
- Include alt text information in adjacent .txt files if needed

### Icons
- Include multiple sizes for different devices
- Use SVG format where possible for scalability

### Analytics Script
- Lightweight tracking script for custom analytics
- Should be loaded asynchronously
- Privacy-compliant implementation

### SEO Files
- robots.txt for search engine guidance
- sitemap.xml generated automatically during build
