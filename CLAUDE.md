# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Who You're Working With

**Orla Marie Mullan** owns this website and makes her own changes to it with Claude. She is an Irish meditation and mindfulness coach from Donegal with 30 years of practice, not a developer.

- Talk in plain language. Describe changes by what she'll see on the page, not by file names or code.
- Don't show code or diffs unless she asks. Summarise what changed instead.
- Before changing wording she wrote, or anything about prices, payments or bookings, read back what you're about to change and confirm.
- She checks her changes on the staging site, often on her phone, before they go live. Always give her the link to look at.
- If something technical goes wrong that you can't fix (the server, DNS, the domain, payments), stop and tell her to ask Conal. Don't guess at infrastructure.

Conal (her husband) built the site and handles the server. He may also use this repo; with him you can be technical.

## How Changes Go Live

There are three places the site can be seen:

| Where | URL | Updates when |
|-------|-----|--------------|
| Local preview | http://localhost:3004 | Instantly, while working (Claude Desktop preview pane, `.claude/launch.json`) |
| Staging | https://orlamariecoach.vercel.app | ~2 minutes after a push to `main` (Vercel) |
| **Live site** | https://orlamariecoach.com | ~10 minutes after a `v*` tag is pushed |

The routine (also available as `/preview` and `/publish`):

1. Make the change. Run `npm run type-check` and `npm run build` and fix any errors.
2. Commit to `main` and push. Wait for staging to update, then give Orla the staging link for the page that changed.
3. Only when Orla says it looks right and asks for it to go live: tag and push (`vYYYY.MM.DD`, add `-2`, `-3` for more releases the same day). See `/publish`.

Never push a tag without Orla's say-so. Pushing to `main` only affects staging, never the live site.

### Production details (for Conal)

- The tag triggers `.github/workflows/deploy-production.yml`, which builds the image and pushes it to `ghcr.io/ffxxrr/orlamariecoach` using the built-in `GITHUB_TOKEN`.
- The production server isn't reachable from GitHub. It runs `deployment/autodeploy.sh` from cron every 5 minutes, and that script pulls `:latest` and recreates the container when the image changed (log: `autodeploy.log` next to the compose file).
- Server env lives in `app.env` on the server (not in the repo). It needs `SESSION_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`, or admin login fails.
- To roll back: re-tag the previous good commit with a new `v*` tag and push it.
- Claude has no server access from Orla's machine, and that's intentional.

## Technology Stack

- **Framework**: Next.js 16 with App Router, React 19
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 3 with earthy color palette
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Docker on our own server (live), Vercel (staging)
- **Analytics**: Custom privacy-first system

## Commands

### Development
```bash
npm run dev          # Start development server on port 3004
npm run build        # Build production (includes Prisma generation)
npm run type-check   # TypeScript checking - run before commits
npm run lint         # Run ESLint
```

### Database (local, optional)
```bash
docker compose up -d # Start local Postgres
npm run db:setup     # Generate Prisma client and push schema
npm run db:studio    # Open Prisma Studio GUI
npm run db:reset     # Reset database (WARNING: destroys data)
```

Public pages render without a database. Only the admin dashboard, feedback and analytics need it.

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
  /feedback/        # Feedback widget
/src/lib/           # Utilities
  /analytics/       # Tracking system
  /auth/            # Signed admin sessions
  db.ts             # Prisma singleton
/content/copy/      # Written content
/public/            # Static assets (images in /public/images, video in /public/media)
/docs/BACKLOG.md    # Living task list
/deployment/        # Production compose file + autodeploy script
/.claude/commands/  # Slash commands
```

### Key Components
- `CelticTriskelion.tsx` - Celtic branding SVG
- `CelticDivider.tsx` / `CelticIcons.tsx` - Section dividers and icon set
- `AudioPlayer.tsx` - Meditation sample player
- `FeedbackWidget.tsx` - Feedback collection

## Design System

Use the `orla-marie-design` skill for any visual work.

### Color Palette (Orla Approved)
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

### Design Direction
- No emojis ("they look childish")
- Earthy browns and creams, not bright greens or primary colors
- Classic and sophisticated; reference [mindfulnesspatagonia.com](https://mindfulnesspatagonia.com/): warm earthy tones, generous whitespace, nature photography
- Irish spiritual narrative: Turas, Anam Chara, thin places, the Celtic Wheel

### Images
Convert and resize new photos before adding them: `node scripts/add-image.js <photo> public/images/<name>.webp [max width]`. It uses `sharp` and works on Windows and macOS. Keep heroes under ~300KB and videos under ~2MB.

Orla works on **Windows**. Claude Code runs shell commands in Git Bash there, so stick to portable commands: no `sips`, `open` or other macOS-only tools.

## Business Context

### Pricing (Confirmed)
- Individual Session: €100/hour
- 6-Session Package: €400 (33% savings)
- Online Courses: €250 (courses page currently hidden on live via `NEXT_PUBLIC_FEATURES_COURSES=false`)

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
3. **Admin Login (dev only)**: `admin@orlamariecoach.com` / `admin123!`. Production uses its own credentials from `app.env`.
4. **Type Check**: Always run before commits
5. **This repo is public.** Never commit passwords, keys, server addresses or private notes.

## Weekly Blog

Posts are markdown files in `content/blog`, one per Tuesday, drafted by Claude and approved by Orla. Follow `content/blog/_GUIDE.md` for every post, and run `npm run lint:blog` until each draft reads "Clean" before showing it to her. Her news and favourites for drafts are in `private/blog-notes.md` (not in the repo).

## Project Management

`docs/BACKLOG.md` is the living task list. Read it at the start of a session (`/start`) and update it at the end (`/end`). Keep the Session Log table current.

### Slash Commands
- `/start` - Load the backlog, check feedback, show what changed recently
- `/preview` - Push current changes to staging and give the link to check
- `/publish` - Put what's on staging onto the live site (only when Orla asks)
- `/end` - Summarise the session and update the backlog
- `/feedback` - Check feedback submitted through the site widget
- `/status` - Quick project health check

## Site Feedback

Visitors (and Orla) can leave feedback through the widget on the staging site.

```bash
curl -s https://orlamariecoach.vercel.app/api/feedback | jq '.feedback | length'
```
