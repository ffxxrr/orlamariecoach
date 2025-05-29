# Image Optimization Plan for OrlaMarieCoach Website

## Overview
This document outlines the image optimization needed for the OrlaMarieCoach website. We've created placeholder components to ensure the site is functional while proper image optimization is being performed.

## Image Requirements

### Services Page
The following images need to be optimized and placed in `public/images/services/`:

1. **one-to-one.webp** - Orla in meditation posture
   - Source: `public/images/orla/raw/7R500125.jpg`
   - Size: 800x600
   - Format: WebP
   - Quality: 80%

2. **group-course.webp** - Group setting image
   - Source: `public/images/orla/raw/7R500362.jpg`
   - Size: 800x600
   - Format: WebP
   - Quality: 80%

3. **corporate.webp** - Professional looking image
   - Source: `public/images/orla/raw/7R500169.jpg`
   - Size: 800x600
   - Format: WebP
   - Quality: 80%

### Courses Page
The following images need to be optimized and placed in `public/images/content/courses/`:

1. **foundations.webp** - Beginner-friendly image
   - Source: `public/images/orla/raw/7R500130.jpg`
   - Size: 800x600
   - Format: WebP
   - Quality: 80%

2. **deepening.webp** - More advanced meditation pose
   - Source: `public/images/orla/raw/7R500325.jpg`
   - Size: 800x600
   - Format: WebP
   - Quality: 80%

3. **daily-life.webp** - Practical application image
   - Source: `public/images/orla/raw/7R500406.jpg`
   - Size: 800x600
   - Format: WebP
   - Quality: 80%

## Optimization Script
A script has been created at `scripts/process-images.js` to automate this process. To run it:

```bash
cd C:\Users\ffxxr\Documents\projects\orlamariecoach
npm install sharp --save-dev
node scripts/process-images.js
```

## Placeholder Solution
In the meantime, we've implemented a placeholder component that creates visually appealing placeholders with icons and text. This ensures the website is fully functional and visually consistent while image optimization is being completed.

The placeholder component is located at:
`src/components/ui/ImagePlaceholder.tsx`

This component is used in:
- `src/components/services/ServicesOfferings.tsx`
- `src/components/courses/CoursesList.tsx`

## Next Steps
1. Run the image optimization script to process the selected images
2. Verify the optimized images appear correctly on the site
3. Consider adding more images for testimonials and other sections
4. Implement proper image loading techniques with `next/image` component's priority and loading properties for optimal performance

## Implementation Notes
- All images use responsive sizing with proper aspect ratios
- WebP format is used for optimal compression and quality
- Image dimensions are set to ensure fast loading while maintaining quality
- Consider implementing a content delivery network (CDN) in the future for improved global performance
