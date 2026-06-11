# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OrlaMarieCoach is a professional Next.js 14 website for Orla Marie, an Irish meditation and mindfulness coach from Donegal with 30 years of practice and 500+ clients helped. The site targets both UK/Ireland and the US Irish diaspora market (32+ million Irish-Americans).

**Vision:** Create a beautiful, engaging website that honors Irish heritage and enables sustainable revenue through courses, 1:1 sessions, and packages.

**Live URL:** https://orlamariecoach.com
**Staging URL:** https://orlamariecoach.vercel.app
**GitHub:** https://github.com/ffxxrr/orlamariecoach

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with earthy color palette
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (auto-deploys from main)
- **Analytics**: Custom privacy-first system (partial)

## Commands

### Development
```bash
npm run dev          # Start development server on port 3004
npm run build        # Build production (includes Prisma generation)
npm run type-check   # TypeScript checking - run before commits
npm run lint         # Run ESLint
```

### Database
```bash
npm run db:setup     # Generate Prisma client and push schema
npm run db:studio    # Open Prisma Studio GUI
npm run db:reset     # Reset database (WARNING: destroys data)
```

### Deployment
```bash
git push origin main    # Auto-deploys to Vercel
```

## Architecture

### Directory Structure
```
/src/app/           # Next.js App Router pages
  /about/           # About page
  /services/        # Services page
  /courses/         # Courses page
  /book-session/    # Booking page
  /contact/         # Contact page
  /admin/           # Admin dashboard
  /api/             # API routes
/src/components/    # Feature-based components
  /home/            # Homepage sections
  /layout/          # Navbar, Footer
  /brand/           # Logo, Celtic elements
  /ui/              # Shared components
  /feedback/        # Stakeholder feedback widget
/src/lib/           # Utilities
  /analytics/       # Tracking system
  db.ts             # Prisma singleton
/content/copy/      # Written content
/public/            # Static assets
/.claude/commands/  # Slash commands for session management
```

### Key Components
- `CelticTriskelion.tsx` - Celtic branding SVG
- `AudioPlayer.tsx` - Meditation sample player
- `FeedbackWidget.tsx` - Stakeholder feedback collection
- `BotanicalAccents.tsx` - Nature-themed decorations

## Design System

### Color Palette (October 2025 - Orla Approved)
```javascript
colors: {
  'forest-deep': '#56140F',      // Deep Burgundy - CTAs
  'sage-calm': '#6E5A2F',        // Dark Olive - Secondary text
  'living-green': '#C9A475',     // Golden Brown - Primary brand
  'earth-warmth': '#F1CBB8',     // Warm Peach - Accents
  'pure-light': '#FFFCF1',       // Cream - Backgrounds
  'deep-text': '#000000',        // Black - Primary text
}
```

### Typography
- **Headings**: Crimson Pro (elegant serif)
- **Body**: Inter (clean sans-serif)

### Design Reference
Orla referenced [mindfulnesspatagonia.com](https://mindfulnesspatagonia.com/) for inspiration - warm earthy tones, generous whitespace, nature photography.

## Business Context

### Pricing (Confirmed)
- Individual Session: €100/hour
- 6-Session Package: €400 (33% savings)
- Online Courses: €250

### Payment Methods
- Revolut, PayPal (current)
- Stripe (to be added)

### Target Audience
- Women 35-55 seeking mindfulness guidance
- UK/Ireland market (primary)
- US Irish diaspora (growth opportunity)

## Development Notes

1. **Port**: Dev server runs on port 3004
2. **Environment**: Copy `.env.example` to `.env.local`
3. **Admin Login**: `admin@orlamariecoach.com` / `admin123!` (dev only)
4. **Database**: `docker compose up -d` then `npm run db:setup`
5. **Type Check**: Always run before commits

## Current Status

**Phase:** Design iteration with stakeholder

### Completed
- Core website structure (6 pages)
- New earthy color palette
- Emoji removal (per Orla's feedback)
- Feedback widget system
- Admin dashboard
- Basic analytics tracking

### In Progress
- Visual polish (photography, animations)
- Payment integration (Stripe)
- Course platform details
- Final content placement

### Pending
- Professional photography from Orla
- Final testimonials collection
- SEO optimization
- Launch preparation

## Project Management

All project planning and session tracking lives in Obsidian (not in this repo).

**Obsidian Vault:** `/Users/conalmullan/Documents/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website-V2/`

Key files:
- `BACKLOG.md` - Living task list, updated each session
- `README.md` - Project overview and navigation
- `01-09` docs - Vision, strategy, roadmap, etc.

### Slash Commands

Use these to manage dev sessions:
- `/start` - Load context from Obsidian, check feedback, show git status
- `/end` - Summarize session, update BACKLOG.md, prep for next session
- `/feedback` - Check Orla's feedback from Vercel API
- `/status` - Quick project health check

## Stakeholder Feedback

**Client:** Orla Marie Mullan (ommullan@gmail.com)
**Method:** Feedback widget on Vercel deployment

### Check for New Feedback
```bash
curl -s https://orlamariecoach.vercel.app/api/feedback | jq '.feedback | length'
```

### Recent Design Direction
- Remove all emojis ("they look childish")
- Earthy browns/creams (not bright greens)
- Reference: mindfulnesspatagonia.com aesthetic
- Classic, sophisticated, not primary colors
