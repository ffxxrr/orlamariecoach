# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The OrlaMarieCoach website is a professional Next.js 14 application for Orla's meditation and mindfulness coaching services. The project features custom privacy-focused analytics, an online course platform, and Digital Samba integration for bookings.

## Technology Stack

- **Framework**: Next.js 14 (React-based) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom nature-inspired color system
- **Database**: PostgreSQL with Prisma ORM
- **Analytics**: Custom privacy-first analytics system (NOT YET IMPLEMENTED)
- **Authentication**: Planned secure admin authentication

## Commands

### Development
```bash
npm run dev          # Start development server on port 3004
npm run build        # Build production application
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Database
```bash
npm run db:setup     # Generate Prisma client and push schema to database
npm run db:studio    # Open Prisma Studio for database management
npm run db:reset     # Reset database (WARNING: destroys all data)
```

### Testing
```bash
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
```

## Architecture Overview

### File Structure
- `/src/app/` - Next.js App Router pages and layouts
  - Core pages: homepage, about, services, booking, contact, courses, brand
  - Global styles and root layout configuration
- `/src/components/` - Reusable React components organized by feature
  - `home/` - Homepage sections (Hero, Services, Testimonials, etc.)
  - `about/` - About page components
  - `services/` - Services page components  
  - `booking/` - Booking system components
  - `contact/` - Contact form and information components
  - `courses/` - Course platform components
  - `layout/` - Navbar and Footer
  - `ui/` - Shared UI components (BotanicalAccents, ImagePlaceholder)
  - `audio/` - Audio player for meditation samples
  - `brand/` - Logo and brand system components
- `/src/lib/` - Utility libraries and custom analytics system
- `/public/` - Static assets including optimized images and audio files
- `/designs/` - Design mockups and style guide
- `/docs/` - Comprehensive project documentation

### Key Features Implemented
1. **Responsive Design**: Mobile-first approach with Tailwind CSS
2. **Audio Player**: Custom meditation audio player with email-gated downloads
3. **Image Optimization**: WebP format with multiple sizes for performance
4. **Botanical Accents**: Nature-inspired design elements throughout
5. **Component Architecture**: Modular, reusable components

### Design System
- **Colors**: Forest Deep (primary), Sage Calm, Living Green, Ocean Breath
- **Typography**: Crimson Pro (headings), Inter (body text)
- **Imagery**: Professional photos of Orla, optimized for web

## Project Management

The project is managed from an Obsidian vault located at:
`/config/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website/`

Current Progress: ~85% complete (Analytics Phase 1 Week 3 COMPLETED, Week 4 STARTED)
- Homepage, About, and Services pages are production-ready  
- Book Session, Contact, and Course Platform pages in progress
- Analytics system: Phase 1 Weeks 1-3 complete (foundation + data collection + working dashboard)
- Admin dashboard: Authentication working, real-time data integration complete

## Development Notes

1. **Port Configuration**: Development server runs on port 3004 (configured in package.json)
2. **Image Handling**: Use Next.js Image component for all images
3. **Audio Files**: Multiple formats (MP3, OGG, MP4) for browser compatibility
4. **TypeScript**: Strict type checking enabled - run `npm run type-check` before commits
5. **Environment Variables**: Copy `.env.example` to `.env` and configure as needed