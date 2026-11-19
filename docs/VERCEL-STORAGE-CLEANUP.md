# Vercel storage: unused files in `public/`

For Conal. Written 19 Nov 2026 after Vercel's "100% of Deployment Storage (10 GB)" email for the free team `ffxxrrs-projects`.

## Situation

- Staging (Vercel) keeps a full copy of every deployment. `public/` is about 188 MB, so each push to `main` adds a large deployment, and 54 commits in the last 30 days filled the 10 GB free tier.
- Vercel now auto-deletes the oldest deployments. The current staging deployment is unaffected, and the live site (Docker on our server) is not involved. No upgrade is needed.
- Done 19 Nov 2026: Conal asked for all 29 files below to be deleted. `public/` went from about 188 MB to 37 MB. They remain in git history if any are needed again.

## Candidates: 29 files, about 151 MB

None of these file names appears anywhere in `src/` or `content/`, and I checked for paths built in code (none found). The "Notes" column says why each looks safe or what to check.

| Size | File (under `public/`) | Last changed | Notes |
| --- | --- | --- | --- |
| 16.5 MB | `images/courses/sadtalker_results_7d69546a-…-u1_7d9888d5.mp4` | 2026-01-12 | Test video, no references |
| 11.4 MB | `media/audio/meditations/irish-countryside-meditation.mp3` | 2025-12-22 | Only `AudioPlayer.tsx` could play it, and that component isn't used on any page. Referenced by `scripts/check-media.js` and `scripts/convert-audio.js` |
| 10.5 MB | `media/audio/meditations/irish-countryside-meditation.mp4` | 2025-05-23 | As above |
| 9.4 MB | `images/orla/optimized/about/7R500362_upscaled.png` | 2026-01-04 | Upscale experiment |
| 7.9 MB | `media/sora/services_new.mp4` | 2026-01-04 | Superseded Sora video |
| 7.7 MB | `media/sora/booking-original.mp4` | 2026-01-10 | Original of `booking.mp4` |
| 7.7 MB | `media/sora/hero-forest-light-clean.mp4` | 2026-01-04 | Site uses `hero-forest-light.mp4` |
| 6.7 MB | `images/courses/bright-half-landscape.png` | 2026-01-10 | Site uses `images/courses/optimized/*.webp` |
| 6.6 MB | `images/courses/dark-half-landscape.png` | 2026-01-10 | As above |
| 6.2 MB | `media/sora/20251222_2125_New Video_simple_compose_….mp4` | 2025-12-22 | Raw Sora download |
| 5.9 MB | `images/courses/turas-landscape.png` | 2026-01-10 | Site uses the webp |
| 5.6 MB | `images/courses/turas-portrait.png` | 2026-01-10 | Site uses the webp |
| 5.6 MB | `images/courses/bright-half-potrait.png` | 2026-01-10 | Site uses the webp |
| 5.6 MB | `images/courses/dark-half-potrait.png` | 2026-01-10 | Site uses the webp |
| 5.5 MB | `media/sora/about-clean.mp4` | 2026-01-04 | Site uses `about.mp4` |
| 4.4 MB | `media/sora/about-original.mp4` | 2025-12-29 | Site uses `about.mp4` |
| 4.3 MB | `media/sora/contact-original.mp4` | 2026-01-10 | Site uses `contact.mp4` |
| 3.2 MB | `media/sora/services-candle.mp4` | 2025-12-24 | Kept on purpose as the old version (BACKLOG line 450) |
| 3.0 MB | `media/sora/courses-8x.mp4` | 2026-01-10 | Site uses `courses.mp4` |
| 3.0 MB | `images/sora/services-page.png` | 2025-12-28 | Sora still, no references |
| 2.6 MB | `media/sora/services-final.mp4` | 2026-01-03 | Superseded |
| 2.5 MB | `images/sora/about-page.png` | 2025-12-28 | Sora still, no references |
| 2.4 MB | `images/sora/courses-page.png` | 2025-12-28 | Sora still, no references |
| 2.2 MB | `images/sora/main-OG-image.png` | 2025-12-28 | Check it isn't the share image in old social posts |
| 0.8 MB | `media/sora/services.mp4` | 2026-01-10 | Superseded |
| 1.1 MB | `images/orla/optimized/about/7R500325_cozy_composite.png` | 2026-01-04 | AI-edited variant, unused |
| 1.1 MB | `images/orla/optimized/about/7R500325_cozy_cat.png` | 2026-01-04 | AI-edited variant, unused |
| 0.8 MB | `images/orla/optimized/about/7R500325_cozy_v2.png` | 2026-01-04 | AI-edited variant, unused |
| 0.5 MB | `images/orla/optimized/about/7R500362_fixed.webp` | 2026-01-04 | Unused |

Not on this list because the site uses it: `public/free/orla-marie-guided-meditation.mp3` (used by the free gift page, and possibly linked from the MailerLite welcome email).

## Before removing

1. Check nothing outside the repo links to these URLs (old Facebook or blog posts, MailerLite emails, Make.com).
2. Move rather than delete: everything is still in git history, but a folder outside `public/` (e.g. `assets-archive/`, or outside the repo) keeps the originals handy.
3. Also clear old deployments by hand: Vercel dashboard, project, Deployments.

## Longer term

- Keep source/original media outside `public/`. Only the optimised files the site serves need to be there.
- Optionally batch staging pushes, or set Vercel's "Ignored Build Step" so commits that only touch `docs/` or `content/blog/_GUIDE.md` don't deploy.
