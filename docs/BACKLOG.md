# Project Backlog

**Last Updated:** June 11, 2026 (Session 30)
**Current Phase:** LIVE - Post-Launch Polish

---

## How This Works

This is the living backlog. Update it each session.
- Move items between sections as work progresses
- Add new items as they emerge
- Remove items that no longer apply
- Keep it current, not perfect

---

## Next Session

### Services Page Images ✅ COMPLETE
- [x] Anam Chara: `orla-green-door.webp` (doorway = threshold narrative)
- [x] Celtic Wheel: `orla-celtic-wheel.webp` (Qwen Edit blue sky image)
- [x] Organisational Resilience: `orla-sage-blazer.webp` (professional corporate look)
- [x] All images have decorative offset frames matching homepage
- [x] Fixed cropping issues - square aspect ratio

### Courses Page Celtic Wheel Rebrand ✅ COMPLETE
- [x] Hero: "Walk the Celtic Wheel" narrative
- [x] Three courses: The Dark Half, The Bright Half, The Turas
- [x] Phase-based gradient backgrounds (cool/warm tones)
- [x] Features as "Stations" on pilgrimage
- [x] Winter Woods image for The Dark Half
- [x] Hero video slowed 8x for smoother loop (backup at `courses-4x.mp4` if too slow)

### Mobile Testing & Polish
- [ ] Test homepage flow on actual mobile device
- [ ] Review velvet green footer on mobile
- [ ] Check Celtic dividers visibility on mobile
- [ ] Apply CelticDivider + alternating backgrounds to Contact page

### Post-Launch
- [ ] Optimize images and assets for production (compress further)
- [ ] Set up database backups for production PostgreSQL
- [ ] Monitor analytics data quality (consent flow, pageview tracking)
- [ ] CI/CD: automate Docker build + deploy on push to main

### Decisions Made
- [x] **Stack Decision:** Keep Next.js (now upgraded to 16.1.1)
- [x] **Analytics:** Keep custom system, evolve over time
- [x] **Bookings:** Use Digital Samba app, integrate later
- [x] **Padding System:** Standardized tiers (standard, breathing, prominent)
- [ ] **Tailwind 4:** Deferred - v3 stable and working

---

## Post-Launch Roadmap (June 11, 2026 — Admin Code Review, SEO Review & Growth Plan)

*Created Session 29 after a full review of the admin/analytics code, SEO posture, and visitor data. Reality check: since launch the DB holds ~57 pageviews across 4 device-buckets — effectively just Orla + Conal testing. No real external traffic yet. So the two big themes are: (1) make analytics trustworthy, and (2) actually get visitors.*

### A. Admin & Analytics Fixes (from admin code review)

**✅ DONE Session 29 — Admin security hardening (deployed to production)**
- [x] Server-side auth gate (`src/middleware.ts`) on `/admin/*` + `/api/admin/*` — APIs were fully unauthenticated (anyone could `curl` the visitor list)
- [x] HMAC-signed session cookies (`src/lib/auth/session.ts`) — old cookie was forgeable unsigned base64
- [x] Removed hardcoded `admin123!` fallback (fails closed in prod), stripped password logging, added per-IP login lockout, constant-time compare
- [x] Feedback PATCH/DELETE now require admin auth
- [x] `SESSION_SECRET` added to production `app.env`

**Data accuracy — ✅ FIXED & DEPLOYED Session 29 (commit d744524):**
- [x] **HIGH: Visitor fingerprint collisions** → now `crypto.randomUUID()`. (Old `btoa(userAgent)` collapsed every iPhone/Mac into one visitor — why the dashboard showed ~4 visitors.) *Historical rows keep collapsed IDs; new visitors are unique.*
- [x] **HIGH: GeoIP hardcoded** → no longer fabricates `Ireland/Leinster`; returns null until a real provider is wired in.
- [x] **HIGH: `AnalyticsSession.duration` never written** → now computed (`endedAt - startedAt`) on session update.
- [x] **HIGH: No SPA pageview tracking** → added `usePathname` re-track effect in AnalyticsProvider.
- [x] MED: Bounce rate → only clears `bounced` when pageviews > 1.
- [x] MED: "Total Visitors" → counts distinct visitors active in range (was NEW-only).
- [x] MED: Avg session duration division-by-zero (NaN) → guarded; prefers stored duration.
- [x] MED: Realtime "Active Pages" → keys by `visitorId` (was `country-device`).
- [x] MED: Unload flush → uses `navigator.sendBeacon` / `keepalive`.
- [x] MED: Bot/crawler filtering added at `/api/analytics/track`.
- [x] LOW: Visitors API → aggregates avg duration in DB (was loading whole table).
- [x] LOW: Visitors page → single debounced fetch (was double-fetching on search).
- [x] *Verified end-to-end against local Postgres; production dashboard now shows real data (was broken 0/1).*

**Data accuracy — still open (lower priority):**
- [ ] LOW: No server-side consent enforcement on `/api/analytics/track`.
- [ ] LOW: "Today" metrics use UTC midnight, not Irish time (off by ~1h; set container TZ to Europe/Dublin).
- [ ] LOW: `pageview.duration` / `scrollDepth` schema columns still never populated (dead fields).

**Admin UI / config:**
- [ ] **Wire up or remove the Settings page** — it's currently 100% fake (fake "Save" timer, random trackingId each load, no API behind it).
- [ ] Set `SESSION_SECRET` (+ confirm `ADMIN_EMAIL`/`ADMIN_PASSWORD`) in **Vercel staging** env, or staging admin login returns 500.

### B. SEO & Discoverability (from SEO review)
*Technical foundation is solid (sitemap, JSON-LD, OG tags, env-aware robots). The gaps are off-page and indexing, not code.*
- [x] **P0: Google Search Console** ✅ DONE June 11 — domain property verified via DNS TXT (Namecheap), sitemap submitted. Check back in ~1 week for query/indexing data.
- [x] **P0: Google Business Profile** ✅ DONE June 11 — Orla created the profile herself. Follow-up: confirm verification completes, add photos/services, then start collecting reviews.
- [x] P1: ~~Only the homepage is indexed~~ ✅ False alarm — URL Inspection shows /about, /services, /contact already indexed (`site:` search was just incomplete).
- [ ] P1: Get listed in the **MTAI teacher directory** (it outranks us today).
- [ ] P1: **Local/niche keyword pages** — "Anam Chara Donegal", "Celtic mindfulness Inishowen", "meditation Buncrana". Generic "meditation coach" is owned by national sites; local + heritage angle is winnable.
- [ ] P2: **Backlinks** — Facebook page → site, local Donegal/wellness directories, guest posts. New domains need links to gain authority.
- [x] P2: ~~Reconsider blocking AI crawlers~~ ✅ DONE June 11 — unblocked on production (commit a80b89b), deployed to orlamariecoach.com. Dev/preview still blocks all crawlers.
- [ ] P2: FAQ schema (ServicesFAQ) + breadcrumb schema (also in Marketing backlog).

### C. Claude's Recommendations (growth, conversion & resilience)
*My input beyond the review — what I'd prioritise to move this from "live brochure" to a site that grows and converts.*

**Capture & nurture (highest ROI while traffic is near-zero):**
- [ ] **Email capture + newsletter** (ConvertKit already backlogged) — with so few visitors, converting the rare one into a subscriber is the single highest-leverage change. Turns the homepage from a brochure into a list-builder.
- [ ] **Lead magnet** — offer a free guided meditation (she has Insight Timer audio) in exchange for an email. Low-commitment entry that builds the list and warms cold visitors.
- [ ] **Content / blog engine** — her Irish-wisdom narrative (thin places, Celtic Wheel, Anam Chara, Donegal sacred sites) is genuinely unique, evergreen, search-friendly material. A post every few weeks compounds into organic search traffic *and* gives her something to email/share.

**Make the path to revenue real:**
- [ ] Finish **Digital Samba booking** + **Stripe** (both backlogged) — there's currently no frictionless way to actually pay or book.
- [ ] **One clear primary CTA** — pick the #1 action (e.g. a free 15-min intro call) and make it the dominant button site-wide. A free first step converts cold meditation-seekers far better than a €100 session ask.

**Trust signals:**
- [ ] **Real testimonials** (waiting on Orla) — social proof is the top conversion driver for coaching.
- [ ] Credentials / "as featured on" strip — her Insight Timer presence and qualifications are proof; surface them.

**Ops & resilience (protect what's now live):**
- [ ] **Production PostgreSQL backups** (backlogged) — there's real data now; automate nightly dumps before a bad reset wipes it.
- [ ] **Finish CI/CD** — automate Docker build/deploy. The manual build→save→scp→load done in Session 29 is slow and error-prone; the `.github` workflow exists but needs registry/SSH secrets. *Also: the registry docker-login is expired (push 401'd) — re-auth it.*
- [ ] **Error + uptime monitoring** — no alert today if the site 500s or goes down. Lightweight: Sentry (errors) + an uptime ping (UptimeRobot / BetterStack).
- [ ] **Accessibility pass** — audience likely skews older; a quick WCAG contrast/keyboard/alt-text audit protects both reach and SEO.

---

## Priority Roadmap (from Playwright Audit - Dec 22)

### P0 - Critical (Fix First)
*Broken functionality that impacts user experience*

- [x] Fix button hydration error in `FreeMeditationSection.tsx` (button nested in button)
- [x] Replace Courses page gray placeholder boxes with real Orla photos
- [x] Fix broken internal links:
  - [x] `/booking` → `/book-session`
  - [x] `/resources` → removed from navbar
  - [x] `/workshops` → redirects to `/contact`
- [x] **Add `robots.ts` to block dev site indexing** ✅
  - Dev site protected from search engines and AI crawlers

### P1 - High Priority (Significant UX Impact)
*Visual issues and dead links that hurt credibility*

- [x] ~~Replace About page Buddha statue placeholder~~ (About page now uses real Orla photos)
- [x] ~~Replace About page generic stock woman photo~~ (Using 7R500130.webp and 7R500406.webp)
- [x] Create footer legal pages OR remove links:
  - [x] `/privacy` - Privacy Policy
  - [x] `/terms` - Terms of Service
  - [x] `/cookies` - Cookie Policy
- [x] Fix Services page broken links:
  - [x] `/courses/foundation` → `/courses`
  - [x] `/corporate` → `/contact`
- [x] Add/fix audio file: `/media/audio/meditations/irish-countryside-meditation.mp3`

### P2 - Medium Priority (Polish)
*Design refinements to match brand standard*

- [x] Add scroll animations to secondary pages (About, Services, Contact) ✅
- [x] Refine icon styles across site (more Celtic/hand-crafted feel) ✅
- [ ] Increase section padding consistency across pages
- [x] Add subtle hover effects to all cards ✅
- [x] About page - add more whitespace between sections ✅
- [x] Contact page - add warm background to hero section ✅ (video hero is better)
- [ ] Test full site on actual mobile devices
- [ ] Optimize images and assets for production

### Pre-Launch SEO (Before Production)
*Required before switching to production domain*

- [x] Generate `sitemap.xml` (Next.js `sitemap.ts` route) ✅
- [x] Add structured data / JSON-LD schemas: ✅
  - [x] Organization schema (business info)
  - [x] LocalBusiness schema (Donegal location)
  - [x] Person schema (Orla Marie)
  - [x] Service schema (meditation services)
  - [x] WebSite schema
- [x] Add Twitter card meta tags ✅
- [x] Add canonical URL tags ✅
- [x] Fix homepage metadata export ✅ (rich keywords added)
- [x] Create OG images for social sharing (per-page) ✅
- [x] Switch `robots.ts` from disallow-all to allow-all (for production) ✅ (env-aware: allows on orlamariecoach.com, blocks on dev)

### Pre-Launch Analytics (Wire Up Tracking) ✅ COMPLETE
*Connect the existing analytics system to components*

- [x] Wire up `trackCourseInteraction()` in course components ✅
- [x] Add booking form submission tracking ✅
- [x] Track audio player interactions (play, pause, complete) ✅ (already implemented)
- [x] Track contact form submissions ✅
- [x] Track CTA button clicks ✅ (all 6 CTA components)
- [x] Verify scroll depth tracking is working ✅ (already implemented)

### P3 - Deferred to Backlog
*Features that require significant new content or pages*

- [ ] Course detail pages (`/courses/1`, `/courses/2`, `/courses/3`)
- [ ] Workshops page (`/workshops`)
- [ ] Corporate page (`/corporate`)
- [ ] Resources page (`/resources`)
- [x] ~~Full-bleed photography on secondary page heroes~~ (Now using Sora video backgrounds)

---

## Backlog (Unprioritized)

### Design & Visual
- [ ] Invitation section carousel (explored, needs better transition design)
- [ ] Testimonial carousel refinement
- [x] Footer redesign ✅ (velvet green + roots gradient)
- [ ] Loading states and animations
- [ ] Full-bleed immersive imagery (needs Orla's photos)
- [ ] **Sensory Grounding section** - "Donegal Landscape as Your Anchor" with evocative sensory text (from Dec 28 feedback, deferred)
- [ ] **Seamless video loops** - Regenerate hero videos with Sora using "seamless loop" prompts (About page first)

### Content
- [ ] Final homepage copy
- [ ] About page - Orla's full story
- [ ] Course descriptions (detailed)
- [ ] Testimonials collection from Orla
- [x] Professional photography from Orla ✓ (11 photos received and optimized)
- [ ] **"Build Your Inner Fortress" mini-course** - Anxiety reduction/boundary setting using Grianán of Aileach metaphor (from Jan 4 feedback)

### Commerce
- [ ] Stripe integration
- [ ] Course purchase flow
- [ ] Session booking system (Digital Samba) - **In progress: DS developer building multi-service widget**
- [ ] Payment confirmation emails
- [ ] Package deal display
- [ ] Wire "Enroll Now" buttons to pass course context to booking page

### Technical
- [x] Set up git push auth (switched remote to SSH) ✓
- [x] Privacy consent banner ✓ (ConsentBanner component implemented)
- [ ] Email capture + ConvertKit
- [x] Production server deployment ✅ (apps3.wbcnf.net, Docker + nginx-proxy + Let's Encrypt)
- [ ] CI/CD pipeline setup (automate Docker build/deploy on push)
- [ ] Database backups (production PostgreSQL on apps3)
- [ ] Upgrade Tailwind to v4 (when tooling matures)

### Marketing (Post-Launch)
- [ ] US market keywords optimization
- [ ] FAQ schema for ServicesFAQ section
- [ ] Breadcrumb schema for navigation
- [ ] Image sitemap for optimized images
- [ ] hreflang tags (if targeting multiple regions)

---

## In Progress

*Nothing currently in progress*

---

## Done (This Sprint)

### June 11, 2026 - P0 SEO Complete (Session 30)
- [x] **Google Search Console verified** — domain property via DNS TXT record at Namecheap, sitemap.xml submitted
- [x] **Google Business Profile created** — Orla set it up herself same day. Follow-up: verification, photos/services, reviews collection
- [x] **Indexing false alarm resolved** — /about, /services, /contact were already indexed (`site:` search was incomplete; URL Inspection is source of truth)
- [x] **AI crawlers unblocked** on production robots.txt (`src/app/robots.ts`, commit a80b89b) — GPTBot/Claude-Web/CCBot etc. now allowed; dev/preview still blocks all
- [x] **Production deploy** via build→save→scp-over-tailnet→load (registry push still 401s — login expired). Verified live: robots.txt updated, homepage 200, container healthy. Rollback image retained on server.

### June 11, 2026 - Analytics Accuracy Fixes (Session 29 cont.)
- [x] **Fixed & deployed 12 analytics bugs** (commit d744524) — see Roadmap section A
- [x] Visitor fingerprint → `crypto.randomUUID()` (fixes the "only 4 visitors" collapse)
- [x] GeoIP no longer hardcoded to Ireland/Leinster; session `duration` now written; bounce logic corrected
- [x] SPA pageview tracking via `usePathname`; `sendBeacon`/`keepalive` on unload; bot filtering added
- [x] "Total Visitors" counts distinct active (not NEW-only); NaN/div-by-zero guards; realtime keyed by visitorId
- [x] Visitors API aggregates in DB; visitors page single debounced fetch
- [x] Verified end-to-end on local Postgres; deployed to production; dashboard now shows real data (was broken 0/1)

### June 11, 2026 - Admin Security Hardening + Review (Session 29)
- [x] **Full admin/analytics code review** (subagent) — found admin APIs were unauthenticated, session cookie forgeable, default password fallback, password logging
- [x] **Fixed & deployed all critical admin security holes:**
  - [x] `src/middleware.ts` — server-side auth gate on `/admin/*` + `/api/admin/*`
  - [x] `src/lib/auth/session.ts` — HMAC-SHA256 signed session cookies (Edge-compatible)
  - [x] Login: removed `admin123!` fallback (fails closed in prod), stripped password logging, per-IP rate-limit/lockout, constant-time compare
  - [x] Feedback PATCH/DELETE now require admin auth
  - [x] Deleted dead insecure `src/lib/auth/admin.ts`
- [x] Generated + added `SESSION_SECRET` to production `app.env` (backup saved)
- [x] Deployed to production via Docker (build→save→scp-over-tailnet→load→compose up); old image retained for rollback
- [x] **Verified live on orlamariecoach.com:** unauth admin APIs now 401 (were 200), forged tokens rejected, default password rejected, valid login still works, public site unaffected
- [x] Committed, merged to main, pushed (b8d246c)
- [x] **Reviewed visitor volume** (~57 pageviews / 4 device-buckets = no real traffic yet) and **SEO posture** (foundation solid, but only homepage indexed, not ranking for generic terms)
- [x] Built comprehensive post-launch roadmap (analytics fixes + SEO + growth recommendations)
- [x] Discovered apps3 is reachable only via Headscale tailnet (`ssh -i ~/.ssh/id_ds_servers_new conal@100.64.0.10`), not public SSH

### February 12, 2026 - PRODUCTION LAUNCH (Session 28)
- [x] **Site is LIVE at https://orlamariecoach.com** with SSL
- [x] Created feature flag system (`NEXT_PUBLIC_FEATURES_COURSES`) - courses/booking hidden in production
- [x] Updated 12 components for feature flag (Navbar, Hero, ThreePaths, SoftCTA, AboutCTA, ServicesCTA, ServicesOfferings, ContactCTA, sitemap, robots, layout, page)
- [x] Created `src/lib/features.ts` helper
- [x] Docker infrastructure: Dockerfile (multi-stage, standalone), .dockerignore, docker-compose.yml
- [x] Deployed to apps3.wbcnf.net (Docker + nginx-proxy + Let's Encrypt SSL)
- [x] Admin password hardened: env-var driven, strong password in production
- [x] Fixed cookie `secure` flag mismatch between login and session routes
- [x] Structured data URLs now env-aware (was hardcoded to vercel.app)
- [x] robots.txt env-aware: allows crawling on production, blocks on dev
- [x] Fixed `pageview_enhanced` routing to AnalyticsPageview table (was going to AnalyticsEvent)
- [x] Fixed session `entryPage`/`exitPage` always null in track API
- [x] Excluded `/admin` pages from analytics tracking
- [x] Cleaned admin analytics data from production DB
- [x] 8 commits, 20+ files changed

### January 12, 2026 - Insight Timer & Image Updates (Session 27)
- [x] Fixed navbar scroll threshold (70% viewport instead of 80px)
- [x] Fixed navbar transitions (specific properties, no more cropping)
- [x] Added Insight Timer embed widget to homepage
- [x] Simplified FreeMeditationSection to just Insight Timer widget
- [x] Updated ThreePaths third card to link to Insight Timer
- [x] Added new "looking away" photo to About page (orla-looking-away.webp)
- [x] Replaced Celtic Wheel image on Services page (orla-celtic-wheel-v2.webp)
- [x] Fixed nested button hydration error
- [x] Resolved 3 feedback items from Orla
- [x] 2 commits pushed

### January 12, 2026 - Admin Production + Logo Integration (Session 26)
- [x] Fixed admin dashboard layout bug (flexbox issue causing huge gap)
- [x] Created `/api/admin/visitors` endpoint with real database queries
- [x] Created `/api/admin/analytics/realtime` endpoint for live stats
- [x] Updated visitors page to use real API (pagination, filtering, sorting)
- [x] Updated realtime page to use real API (active pages, recent activity)
- [x] Fixed visitor pageview count (was 0, now sums session.pageviews)
- [x] Fixed realtime "Active Pages" (queries active visitors, uses exitPage)
- [x] Changed contact email to admin@orlamariecoach.com (Footer, SoftCTA)
- [x] Added Creative Mindfulness Ireland credential
- [x] Added Psychotherapy (University of Manchester) credential
- [x] Changed Bhagavad Gita → "meditation book on grandmother's bookshelf"
- [x] Changed Celtic Wheel image to orla-read.jpeg
- [x] Replaced Organisational Resilience photo with office-plants.webp
- [x] Cropped, made transparent, and integrated Om Coach logo
- [x] Added "Orla Marie Coach" text + logo to navbar
- [x] Logo turns white via CSS filter on transparent navbar
- [x] 15 files changed, 8 commits

### January 3, 2026 - Services Page Irish Wisdom Narrative (Session 22)
- [x] Integrated "Ancient Irish Wisdom" narrative into Services page (from Orla's feedback)
- [x] ServicesHero: "Services & Guidance" → "Ancient Wisdom, Modern Practice"
- [x] ServicesHero: "Your path to inner peace" → "Build your own architecture of resilience"
- [x] Rebranded "One-to-One Sessions" → "Anam Chara Guidance" (Soul Friend tradition)
- [x] Rebranded "Foundation Course" → "The Celtic Wheel" (Dark Half/Bright Half seasons)
- [x] Rebranded "Corporate Programmes" → "Organisational Resilience" (cashel metaphor)
- [x] ServicesCTA: "Begin your mindfulness journey" → "Find your thin place"
- [x] New Sora video: light beam through ancient stone fort
- [x] Video processing: 2x slowdown, fade to/from white, 1.5s white hold for seamless loop
- [x] Fixed ServicesFAQ CelticDivider clipping (removed overflow-hidden)
- [x] Refined Sora prompt approach with orla-marie-design skill guidance
- [x] 5 files changed, 4 commits, deployed to Vercel

### December 28, 2025 - About Page Irish Spiritual Narrative (Session 21)
- [x] Rewrote AboutHero: "Thirty years of practice" → "A thirty-year Turas" + Anam Chara language
- [x] Rewrote AboutStory: Complete pilgrimage framing with sensory Donegal anchors (moss, Atlantic, standing stones)
- [x] New quote: "I guide you to the threshold—you step through"
- [x] Updated AboutCredentials: "Personalised Approach" → "Your Anam Chara" with soul friend description
- [x] Updated AboutCTA: "Find your stillness" → "Find your thin place"
- [x] Marked both Dec 28 feedback items as resolved (Homepage + About)
- [x] Explored video loop solutions (ping-pong, CSS fade) - parked for Sora regeneration
- [x] 4 files changed, committed and deployed

### December 28, 2025 - Design Consistency Across Pages (Session 20)
- [x] Updated AboutCTA to use ArrowFlow Celtic arrow (matching homepage)
- [x] Removed non-functional scroll indicator from AboutHero
- [x] Fixed CelticDivider overlay on About page hero (removed overflow-hidden from AboutStory)
- [x] Added bottom CelticDivider to AboutCTA (above footer)
- [x] Applied same fixes to ServicesCTA, CoursesCTA, BookingCTA, ContactCTA
- [x] All secondary CTA links now use ArrowFlow instead of line+SVG arrow
- [x] 7 files changed, consistent design language across all pages

### December 28, 2025 - Thin Places Narrative & Design Polish (Session 19)
- [x] Reviewed detailed feedback on Irish spiritual concepts (Thin Places, Anam Chara, Celtic Wheel)
- [x] Updated Hero: "Find stillness" → "Enter the thin place", removed scroll indicator
- [x] Updated Invitation: Added thin places context, introduced Anam Chara concept
- [x] Updated ThreePaths: "Personal Guidance" → "Your Anam Chara", "Structured Learning" → "The Celtic Wheel"
- [x] Updated AboutGlimpse: Added Donegal sensory grounding
- [x] Updated SoftCTA: Reinforced Anam Chara at close
- [x] Added Vesica Piscis sacred geometry to Invitation section (Sora-generated, 5% opacity)
- [x] Created new Celtic arrow icon (Sora PNG, forest-deep color, 72px, transparent bg)
- [x] Removed decorative lines from CTA links, improved hover effects
- [x] Cropped Free Meditation image to remove black letterbox bars
- [x] Added rounded top corners to footer (rounded-t-3xl)
- [x] Installed ImageMagick via Homebrew
- [x] Deferred Sensory Grounding section to backlog
- [x] 14 files changed, feedback marked as resolved

### December 28, 2025 - Analytics Event Tracking (Session 18)
- [x] Wired up `trackCourseInteraction()` in CoursesList.tsx and CoursesCTA.tsx
- [x] Added contact form tracking: `form_started` on first focus, `form_submitted` with inquiry data
- [x] Added conversion tracking for contact form submissions
- [x] Refactored ContactInfo.tsx for email/booking link click tracking
- [x] Added `trackNavigation()` to all 6 CTA components (SoftCTA, AboutCTA, ServicesCTA, BookingCTA, ContactCTA, CoursesCTA)
- [x] Added `trackBookingFlow()` to BookingCTA widget clicks
- [x] Verified AudioPlayer already has comprehensive play/pause/complete/download tracking
- [x] Verified scroll depth tracking already implemented in SessionManager
- [x] 9 files changed, 127 insertions, 32 deletions
- [x] Build and type-check passed, committed and pushed

### December 28, 2025 - SEO Infrastructure (Session 17)
- [x] Created `robots.ts` to block dev site indexing (search engines + AI crawlers)
- [x] Created `sitemap.ts` with 9 public pages and priorities
- [x] Created `StructuredData.tsx` with JSON-LD schemas (Organization, LocalBusiness, Person, Service, WebSite)
- [x] Enhanced layout metadata (metadataBase, Twitter cards, robots meta)
- [x] Added homepage metadata with rich keywords
- [x] Generated 4 OG images from Sora prompts (1200x630, 173-368KB each)
- [x] Wired OG images to layout and page-specific metadata
- [x] Marked Dec 26 feedback as resolved (bubble images already removed)
- [x] 13 files changed, ~350 lines added

### December 25, 2025 - Cross-Page Theming (Session 16)
- [x] Applied CelticDivider component to About, Services, Courses, Booking pages
- [x] Applied alternating backgrounds (`bg-pure-light` / `bg-living-green/20`) to all secondary pages
- [x] Added warm atmospheric glows to testimonial sections (About, Courses, Booking)
- [x] Changed `bg-earth-warmth/20` → `bg-living-green/20` for consistency with homepage
- [x] 16 components modified across 4 pages
- [x] Build and type-check passed
- [x] Changes staged but not committed (pending user approval)

### December 25, 2025 - Section Contrast & Celtic Dividers (Session 15)
- [x] Created reusable `CelticDivider` component (`src/components/ui/`)
- [x] Added Celtic dividers between ALL homepage sections
- [x] Improved section contrast with `living-green/20` alternating backgrounds
- [x] Increased divider opacity from 40% to 60% for visibility
- [x] Redesigned footer: velvet green (#1E3A2F) + roots gradient + organic SVG
- [x] Enhanced `ArrowFlow` icon with Celtic spiral tip (triskelion echo)
- [x] Updated `AboutGlimpse` to use ArrowFlow component
- [x] Used orla-marie-design skill for contrast analysis
- [x] 8 files changed, 127 insertions, 70 deletions

### December 24, 2025 - Celtic Icons & Video Refinement (Session 11)
- [x] Replaced Services hero video with hands-on-stone (less religious than candle)
- [x] Compressed new video 5.5MB → 1.3MB, preserved old as services-candle.mp4
- [x] Created `CelticIcons.tsx` with 18 hand-crafted SVG icons
- [x] Icons follow brand: thin 1.5px strokes, organic curves, "felt not forced" Celtic
- [x] Updated Footer: emojis → Celtic icons, refined social icons
- [x] Updated ContactInfo with 4 Celtic icons (email, clock, location, calendar)
- [x] Updated ContactQuickQuestions with 4 Celtic icons (heart, leaf, spiral, globe)
- [x] Updated BookingWidget with phone, check icons, SeedBullet points
- [x] Added ArrowFlow CTA to ThreePaths, ServicesOfferings, CoursesList
- [x] Added SeedBullet list markers to ServicesOfferings, CoursesList
- [x] 9 files changed, 466 insertions, 117 deletions

### December 24, 2025 - P2 Polish Session (Session 10)
- [x] Fixed BookingHero full-screen video (removed Section/Container wrapper)
- [x] Added scroll animations to 9 components (Contact & Booking pages)
- [x] Replaced emojis with SVG icons in ContactInfo (4 icons)
- [x] Replaced emojis with SVG icons in ContactQuickQuestions (4 icons)
- [x] Replaced emoji with SVG icon in BookingWidget (phone icon)
- [x] Increased About page section whitespace (py-24 → py-28, md:py-32 → md:py-36)
- [x] 14 files modified, 367 insertions, 158 deletions

### December 24, 2025 - Mobile Video & Complete Heroes Session
- [x] Created reusable `VideoHeroBackground` component with mobile-smart focal points
- [x] Video plays on all devices (not just desktop) with `object-position` handling
- [x] Added Ken Burns + breathing light effects while videos load
- [x] Added Tailwind animations: `ken-burns`, `breathe`, `light-drift`
- [x] Generated Sora videos: courses.mp4, contact.mp4, booking.mp4
- [x] Created poster images for all new videos
- [x] Updated CoursesHero, ContactHero, BookingHero to use VideoHeroBackground
- [x] Made all 5 secondary page heroes full-screen (`h-screen`)
- [x] Redesigned BookingHero (removed emojis, matched site aesthetic)
- [x] Extended transparent navbar to all 6 video hero pages
- [x] Explored Invitation carousel (reverted - needs design refinement)

### December 22, 2025 - Secondary Pages + Sora Videos Session
- [x] Applied homepage aesthetic to all secondary pages (About, Services, Courses, Contact, Booking)
- [x] Redesigned 30 files: heroes, testimonials, CTAs, FAQs, offerings
- [x] Removed OMMethod components from About page
- [x] Added Sora video background to About page hero
- [x] Added Sora video background to Services page hero
- [x] Generated poster images for instant video loading
- [x] Implemented prefers-reduced-motion accessibility for all videos
- [x] Extended transparent navbar to About and Services pages
- [x] Documented Sora prompts for remaining pages (Courses, Contact, Book Session)

### December 22, 2025 - Homepage Redesign Session
- [x] Marked all 7 feedback items as resolved
- [x] Converted MP3 audio file and deployed
- [x] Created human-centered legal pages (privacy, terms, cookies)
- [x] Removed OM Method section (pending Orla input)
- [x] **Complete homepage redesign:**
  - [x] Transparent → frosted glass navbar with full-screen mobile menu
  - [x] New Invitation section (breathing intro)
  - [x] ThreePaths section (full-width bands replacing card grid)
  - [x] TestimonialFeature (single powerful quote)
  - [x] AboutGlimpse (asymmetric layout with Orla photo)
  - [x] SoftCTA (gentle ending)
- [x] Redesigned consent banner to match brand aesthetic
- [x] Homepage reduced from 8+ sections to 6 focused experiences

### December 22, 2025 - P0 Critical Fixes Session
- [x] Optimized new Orla photo (7R500154.jpg) - 47MB → 320KB (5 webp variants)
- [x] Fixed button hydration error in FreeMeditationSection
- [x] Replaced CoursesList gray placeholders with real Orla photos
- [x] Fixed all broken internal links (6 total)
- [x] Removed broken placeholder files (3 corrupt ~80 byte images)
- [x] Removed unused ImagePlaceholder component
- [x] Cleaned up unused imports
- [x] All P0 items complete!

### December 22, 2025 - Design Polish Session
- [x] Fixed all color inconsistencies (removed old green SVGs)
- [x] Updated CelticTriskelion, BrandSystem, layout themeColor to earthy palette
- [x] Created reusable scroll animation system (useScrollAnimation hook + ScrollReveal component)
- [x] Added scroll-triggered animations to About, Services, Testimonials, OMMethod sections
- [x] Polished Services cards with icons and hover effects
- [x] Updated Navbar with cleaner active states and refined CTA button
- [x] Created atmospheric SectionDivider component (dots, line, wave, curve variants)
- [x] Simplified homepage page.tsx structure
- [x] Verified Hero mobile responsiveness

### December 22, 2025 - Major Upgrade & Hero Session
- [x] Upgraded React 18 → 19.2.3
- [x] Upgraded Next.js 14 → 16.1.1
- [x] Upgraded ESLint 8 → 9.39.2
- [x] Upgraded Prisma 5 → 6.19.1
- [x] Upgraded Zod 3 → 4.2.1
- [x] Upgraded TypeScript to 5.9.3
- [x] Fixed React 19 breaking changes (JSX namespace, async params, cloneElement)
- [x] Resolved all 6 npm vulnerabilities → 0
- [x] Redesigned Hero section with full-bleed video background
- [x] Generated Sora forest light video for hero
- [x] Compressed video 7.7MB → 2.2MB (71% reduction)
- [x] Created poster image for instant load
- [x] Implemented reduced-motion support
- [x] Stack decision: Keep Next.js + custom analytics

### December 22, 2025 - Dev Tooling Session
- [x] Created slash commands: /start, /end, /feedback, /status
- [x] Cleaned repo - removed 60+ legacy docs/files (now in Obsidian)
- [x] Enhanced frontend-design skill for Orla's brand
- [x] Added Sora prompt templates for hero imagery
- [x] Created design tokens file (colors, typography, spacing)
- [x] Researched award-winning wellness sites (Awwwards, mindfulnesspatagonia.com)
- [x] Set up public/media/sora/ for generated assets

### December 22, 2025 - Planning Session
- [x] Deep codebase analysis
- [x] Obsidian vault review
- [x] Competitor research
- [x] Created 9 strategic documents
- [x] Updated CLAUDE.md
- [x] Added Sora video prompts
- [x] Self-hosting deployment guide
- [x] Stack evaluation criteria
- [x] Core principles defined

---

## Blocked / Waiting

| Item | Waiting For |
|------|-------------|
| ~~Professional photos~~ | ✅ 11 photos received and optimized! |
| Testimonials | Orla to collect from clients |
| Final copy approval | Orla review |
| ~~Audio meditation file~~ | ✅ MP3 converted and deployed |
| **OM Method section redesign** | Orla input - removed from homepage, needs reimagining with her vision |

---

## Ideas / Someday

- Group meditation programs
- Corporate wellness packages
- Virtual retreats from Ireland
- Membership/subscription model
- Mobile app
- Podcast integration
- Irish-American organization partnerships

---

## Session Log

| Date | Focus | Outcome |
|------|-------|---------|
| 2026-06-11 | **P0 SEO Complete (Session 30)** | Search Console verified + sitemap submitted. Orla created Business Profile. Inner pages confirmed already indexed. AI crawlers unblocked + deployed to production. Next: MTAI directory, local keyword pages, check Search Console data in ~1 week. |
| 2026-06-11 | **Admin Security + Review (Session 29)** | Fixed & deployed all critical admin security holes (auth gate, signed sessions, no default password, login lockout). Reviewed visitor volume (no real traffic yet) + SEO. Built post-launch roadmap: analytics accuracy fixes, SEO/discoverability, growth & resilience. |
| 2026-02-12 | **PRODUCTION LAUNCH (Session 28)** | Site live at orlamariecoach.com! Feature flags for courses, Docker deployment to apps3, admin security hardened, SEO finalized, 3 analytics bugs fixed. 8 commits. |
| 2026-01-12 | **Insight Timer & Images (Session 27)** | Added Insight Timer widget to homepage. Fixed navbar scroll/transition issues. New images: About page looking-away, Services Celtic Wheel. 3 feedback items resolved. 2 commits. |
| 2026-01-12 | **Admin Production + Logo (Session 26)** | Admin dashboard production-ready: real API endpoints for visitors/realtime, fixed layout bugs, pageview counts. Logo integration with transparent bg. Content updates: email, credentials, images. 8 commits. |
| 2026-01-10 | **Course Journey Modal + Cleanup (Session 25)** | Added cinematic fullscreen journey modal with Ken Burns effect. New portrait/landscape infographics for all courses. Removed BotanicalAccents overlays. Slowed hero videos (courses 8x, booking 4x). 11 commits. |
| 2026-01-10 | **Courses Celtic Wheel + Polish (Session 24)** | Rebranded Courses as Celtic Wheel (Dark Half/Bright Half/Turas). Added decorative frames to About/Services/Courses images. Fixed CelticDivider clipping in 9 sections. Slowed courses hero video 4x. Added Winter Woods + sage blazer images. |
| 2026-01-04 | **Services Page Images (Session 23)** | Replaced Buddha with doorway image, added Celtic Wheel Qwen image, fixed cropping (square aspect), renamed files for clarity. |
| 2026-01-03 | **Services Page Narrative (Session 22)** | Integrated Ancient Irish Wisdom into Services. Rebranded to Anam Chara, Celtic Wheel, Organisational Resilience. New Sora video. |
| 2025-12-28 | **About Page Narrative (Session 21)** | Irish spiritual content: Turas, Anam Chara, thin places. 4 About components rewritten. Feedback resolved. |
| 2025-12-28 | **Design Consistency (Session 20)** | ArrowFlow + CelticDividers across all pages, removed scroll indicator, fixed overflow clipping. 7 files. |
| 2025-12-28 | **Analytics Event Tracking (Session 18)** | Wired up tracking in 9 components: courses, contact form, CTAs. 127 lines added. |
| 2025-12-28 | **SEO Infrastructure (Session 17)** | robots.ts, sitemap.xml, JSON-LD schemas, OG images, Twitter cards, canonical URLs |
| 2025-12-25 | **Cross-Page Theming (Session 16)** | Applied CelticDivider + alternating bg to About, Services, Courses, Booking (16 components) |
| 2025-12-25 | **Section Contrast & Dividers (Session 15)** | CelticDivider component, living-green/20 alternating bg, velvet green footer with roots, ArrowFlow spiral |
| 2025-12-24 | **Homepage Simplification (Session 14)** | Minimal footer, removed SoftCTA, fixed ThreePaths images, Celtic dividers |
| 2025-12-24 | **Homepage Backgrounds (Session 13)** | Warm radial glows, bigger headings, velvet green footer, image frames |
| 2025-12-24 | **Padding Standardization (Session 12)** | Section tier system, 13 files updated, site-wide consistency |
| 2025-12-24 | **Celtic Icons (Session 11)** | New CelticIcons.tsx, Services video replaced, 7 components updated |
| 2025-12-24 | **P2 Polish (Session 10)** | Scroll animations, emoji removal, About whitespace, BookingHero fix |
| 2025-12-24 | **Mobile video + complete heroes** | All 6 pages have Sora video heroes, mobile-optimized, full-screen immersive |
| 2025-12-22 | **Secondary pages + Sora videos** | All pages redesigned, About/Services video heroes, transparent navbar |
| 2025-12-22 | Homepage redesign | Award-winning aesthetic: new navbar, 6 sections, consent banner |
| 2025-12-22 | P0 critical fixes | All P0 complete! Hydration fix, real photos, 6 broken links fixed |
| 2025-12-22 | Playwright audit & roadmap | Full site audit, 38 broken links found, priority roadmap P0-P3 created |
| 2025-12-22 | Design polish session | Colors fixed, scroll animations, Services icons, Navbar polish |
| 2025-12-22 | Major upgrade & Hero design | React 19, Next 16, 0 vulns, Hero with video |
| 2025-12-22 | Dev tooling & design skill | Slash commands, clean repo, enhanced skill |
| 2025-12-22 | Project planning & analysis | 9 docs created, ready for Phase 0 |
| Next | Image review | Review ThreePaths images for cropping/focus |

---

*Update this file at the start and end of each session.*
