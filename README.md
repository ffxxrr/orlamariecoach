OrlaMarieCoach Website

This is the Next.js 14 codebase for Orla Marie Coach. Active development is on the `feature/initial-setup` branch.

Quick Start
- Node 18+ and npm required
- Checkout branch: `git checkout feature/initial-setup`
- Install deps: `npm install`
- Copy env: `cp .env.example .env.local` and update values
- Start Postgres: `docker compose up -d`
- Push Prisma schema: `npm run db:setup`
- Run dev server: `npm run dev` (http://localhost:3004)

Documentation
- See `docs/DEV-RESURRECTION-CHECKLIST.md` for full steps
- See `docs/README.md` for architecture, plans, and references

Notes
- Prisma uses Postgres; configure `DATABASE_URL` in `.env.local`
- Admin dev login: email `admin@orlamariecoach.com`, password `admin123!` (dev only)
