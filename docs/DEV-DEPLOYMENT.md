# Dev Deployment Guide (Vercel)

## Prerequisites
- Vercel account
- This repo connected to Vercel

## Steps
1. Create a new Vercel project and link the repo
2. Environment variables:
   - `DATABASE_URL` → your Postgres instance (use the same value as `.env`)
3. Build settings:
   - Framework: Next.js
   - Default build command (`next build`) and output
4. Deploy and test:
   - Verify pages load and API routes respond
   - If database is remote, allow Vercel IP access if your Postgres is behind a firewall

## Notes
- For dev previews, consider Vercel Postgres for convenience
- Avoid local container IPs (`172.x.x.x`) in Vercel; use a public Postgres URL
- Keep analytics minimal; production hardening to follow later

