# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OrlaMarieCoach is a professional Next.js 14 website for meditation and mindfulness coaching services. Features include custom privacy-focused analytics, an online course platform, and Digital Samba integration for bookings.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom nature-inspired design system
- **Database**: PostgreSQL with Prisma ORM
- **Analytics**: Custom privacy-first analytics system
- **Authentication**: Admin authentication system

## Commands

### Development
```bash
npm run dev          # Start development server on port 3004
npm run build        # Build production application (includes Prisma generation)
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

### Directory Structure
- `/src/app/` - Next.js App Router pages and layouts
  - Pages: homepage, about, services, booking, contact, courses, brand
  - Admin dashboard with authentication and real-time analytics
  - API routes for health checks, analytics, and admin functions
- `/src/components/` - Feature-based component organization
  - Page-specific components: `home/`, `about/`, `services/`, `booking/`, `contact/`, `courses/`
  - Shared components: `layout/` (Navbar, Footer), `ui/` (reusable UI components)
  - Specialized: `audio/` (meditation player), `brand/` (logo system), `analytics/` (tracking)
- `/src/lib/` - Utilities and custom systems
  - `analytics/` - Privacy-first analytics implementation
  - `db.ts` - Prisma client singleton
  - `auth.ts` - Admin authentication utilities
- `/public/` - Static assets (images, audio)
- `/designs/` - Design mockups and style guide
- `/docs/` - Project documentation

### Key Patterns

1. **Component Architecture**: Section-based layouts with Container and BotanicalAccents for consistent styling
2. **Database Access**: Singleton Prisma client pattern to prevent connection issues
3. **Privacy-First Analytics**: Consent-based tracking with GDPR compliance
4. **Image Optimization**: WebP format with multiple sizes for responsive loading
5. **Type Safety**: Zod validation for forms and API routes

### Design System

- **Colors**: 
  - Primary: Forest Deep (#2d5a27), Sage Calm (#4a7c59), Living Green (#7fb069)
  - Accent: Ocean Breath (#87ceeb), Earth Warm (#d2691e)
- **Typography**: Crimson Pro (headings), Inter (body)
- **Animations**: Botanical-themed (leaf floating, gentle pulse, ripple)

## Development Notes

1. **Port Configuration**: Dev server runs on port 3004 (configured in package.json)
2. **Environment Setup**: Copy `.env.example` to `.env.local` and configure DATABASE_URL
3. **Admin Dev Login**: `admin@orlamariecoach.com` / `admin123!` (development only)
4. **Database Setup**: Run `docker compose up -d` for local Postgres, then `npm run db:setup`
5. **Type Checking**: Always run `npm run type-check` before commits
6. **Branch Strategy**: Active development on `feature/initial-setup`, main branch is `main`

## Current Status

~85% complete - Analytics Phase 1 Week 3 completed
- ✅ Homepage, About, Services pages production-ready
- 🚧 Book Session, Contact, Course Platform in progress
- ✅ Admin dashboard with real-time analytics
- 🚧 Analytics Phase 1 Week 4 started

## Project Management

Managed from Obsidian vault at: `/config/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website/`

Contains strategic planning, task tracking, client communications, and content strategy.