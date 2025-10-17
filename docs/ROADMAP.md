# OrlaMarieCoach — Project Roadmap

This roadmap captures goals, phases, milestones, owners, and the flow for developer–stakeholder collaboration. It complements the setup and deployment guides.

References
- Dev setup: docs/DEV-RESURRECTION-CHECKLIST.md
- Dev deployment: docs/DEV-DEPLOYMENT.md
- Design language: docs/DESIGN-TOKENS.md
- Health check: GET /api/health
 - Stakeholder review guide: docs/STAKEHOLDER-REVIEW.md

## Objectives
- Provide a serene, modern site that reflects the brand.
- Enable privacy‑first analytics and lightweight admin reporting.
- Ship a dev preview quickly; harden for production after feedback.

## Phases & Milestones
- Phase 0 — Recovery (DONE)
  - Repo brought up locally, Prisma/Postgres configured, UI polish pass
  - Milestones: Setup docs, layout polish, Prisma singleton, health route

- Phase 1 — Dev Preview & Review (IN PROGRESS)
  - Deploy Preview on Vercel with Vercel Postgres
  - Share preview URL + review brief (see docs/STAKEHOLDER-REVIEW.md); collect feedback in a single channel
  - Milestones: Preview live, stakeholder feedback captured and triaged

Showcase First (What to show Orla)
- Preview URL to review now: https://orlamariecoach-9pyotkq6i-ffxxrrs-projects.vercel.app
- If production domain 404 persists, do not block: use the preview link for walkthroughs
- Optional: Promote successful preview to production in Vercel when ready

- Phase 2 — UI/UX Polish Sprint (NEXT)
  - Address top feedback items (copy, spacing, navigation, CTAs)
  - A11y pass: focus, alt text, contrast, landmarks
  - Milestones: UI polish PR merged; a11y checklist passes

- Phase 3 — Production Readiness
  - Auth hardening (secure cookies, CSRF, session storage strategy)
  - Analytics: rate limiting, payload validation, consent review
  - SEO/perf: robots/sitemap, meta, Lighthouse, image sizing
  - Milestones: PROD checklist green; prod deploy dry‑run

- Phase 4 — Launch + Post‑Launch
  - Promote to Production; confirm error/traffic monitoring
  - Post‑launch fixes; cadence for content updates
  - Milestones: Launch announcement; 1‑week stability review

## Owners & Roles
- Engineering: Implements features, fixes lint/type, deployment
- Product/Stakeholder: Prioritizes feedback, approves content/copy
- Design (if applicable): Visual QA, iconography, motion guidance
- Ops: Environment variables, secrets, backups, access control

## Developer–Stakeholder Workflow
- Preview: Vercel preview URL shared with a short review brief
- Feedback: Single doc or issue template capturing page, screenshot, severity, suggestion
- Triage: Label by priority (P0/P1/P2), area (Home/Services/etc.), type (UI/Copy/A11y)
- Sprint: 1–2 week cycles; ship high‑impact items first

## Deployment Plan
- Preview: Branch push → Vercel Preview; DB = Vercel Postgres (Hobby)
- Production: Promote a successful Preview or push to main (Production branch)
- Env: Set DATABASE_URL in Vercel for Preview/Production (use Prisma URL)

## Health & Validation
- Health route: /api/health returns DB connectivity, version, and latency
- Local: npm run type-check; npm run lint (relaxed rules during preview)
- Data: Prisma Studio can connect to Vercel Postgres for verification

## Risks & Mitigations
- Hydration mismatches: keep client‑only code in client components; suppressHydrationWarning where needed
- DB connections on serverless: Prisma singleton (implemented)
- Overly strict lint blocking preview: relaxed rules now; re‑tighten pre‑prod

## Next Actions (Short List)
- Stakeholder review on Preview URL; capture feedback (owner: Stakeholder/PM)
- Triage feedback into P0/P1; create tasks (owner: Engineering/PM)
- Fix production domain 404 by promoting a successful build and mapping domain (owner: Engineering)
- Add PROD readiness doc/checklist (owner: Engineering)

## Resuming Checklist
- Pull latest; run: docker compose up -d → npm run dev (http://localhost:3004)
- Verify health: /api/health on preview/prod domains
- Confirm Vercel envs and domain mapping (Production points to latest build)
- Start Sprint: implement top‑priority feedback items
