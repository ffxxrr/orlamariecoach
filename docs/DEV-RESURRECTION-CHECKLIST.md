# Dev Resurrection Checklist

This checklist brings the project back to a working local dev state using Next.js 14 and Prisma with Postgres.

## Branch & Setup
- Checkout working branch: `git checkout feature/initial-setup`
- Install dependencies: `npm install`
- Copy env:
  - Prisma: `cp .env.example .env` (Prisma CLI reads `.env`)
  - Next.js: `cp .env.example .env.local` (Next.js reads `.env.local`)
  - Adjust `DATABASE_URL` if needed
  - If using Docker container IP, set: `postgresql://orla:orla@172.19.0.2:5432/orla_dev?schema=public`

## Database (Postgres via Docker Compose)
- Start Postgres: `docker compose up -d`
- Verify connection: `docker ps` shows `postgres`
- Push schema: `npm run db:setup` (runs `prisma generate && prisma db push`)
- Optional: open Prisma Studio: `npm run db:studio`

## Run the App
- Start dev server: `npm run dev`
- Visit: `http://localhost:3004`

## Admin Login (Dev Only)
- Navigate: `/admin/login`
- Credentials:
  - Email: `admin@orlamariecoach.com`
  - Password: `admin123!`

## Analytics (Phase 0 Validation)
- Ensure `AnalyticsProvider` loads (homepage renders without errors)
- Confirm tracking API reachable: `/api/analytics/track` (automated calls from the provider)
- Check DB writes via `npm run db:studio` (tables: `AnalyticsVisitor`, `AnalyticsSession`, `AnalyticsPageview`, `AnalyticsEvent`)

## QA Pass
- Verify pages render: Home, About, Services, Courses, Contact, Book Session
- Check image paths under `public/` and favicon integration
- Run type-check & lint: `npm run type-check` and `npm run lint`
- Responsive audit: test at 360, 768, 1024, 1280, 1440 widths; ensure no overflow and comfortable spacing
- Contrast check: verify readable contrast for text on soft backgrounds

## Known Caveats (Dev)
- Admin session cookie is insecure and broad for localhost by design; will harden later
- Analytics payload validation is basic; rate limiting and error handling to be improved for production
- No seed data; courses/modules/lessons can be added via Prisma Studio for demos

## Troubleshooting
- Missing `DATABASE_URL`: Ensure `.env` exists with `DATABASE_URL`
- Connection error (P1001): Verify Postgres is running (`docker compose up -d`), port `5432` not blocked, and credentials match Compose
- Container IP usage: Find with `docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' orla_postgres` and update both `.env` and `.env.local`
- CLI not found: Ensure `npm install` completed; Prisma CLI is in devDependencies

## Next Steps (Post Dev Bring-up)
- Deploy a dev preview (Vercel) and configure `DATABASE_URL`
- Content polish and copy review per `docs/site-architecture.md`
- Production prep: secure auth, DB backups, GDPR consent flows
