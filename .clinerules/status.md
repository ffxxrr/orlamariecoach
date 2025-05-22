# OrlaMarie Coach Website - Project Status

## Current Status: Phase 1 Complete / Phase 2 Started

The initial project setup is complete. Phase 2 (Content Systems and Booking) is now underway. This status document should be updated regularly to track progress and document key decisions.

## Task Status

### Completed
- [x] Create project documentation
- [x] Define technology stack
- [x] Create architecture diagram
- [x] Initialize repository (via template cloning)
- [x] Set up base Astro project with Flowbite (via template)
- [x] Create basic project structure (cleaned and organized template)
- [x] Implement essential static pages (Home, About, Contact placeholders)
- [x] Set up responsive navigation using Flowbite components (in MainLayout)
- [x] Implement initial styling and branding (Tailwind config, Flowbite JS)

### Next Up (Phase 2 / Phase 3)
- [x] Set up MongoDB connection (Docker setup, connect utility)
- [x] Define MongoDB models (BlogPost, Service, Testimonial, CoachProfile, PageView, Event)
- [x] Create blog content collections (schema defined, sample posts created)
- [x] Implement blog listing page (`src/pages/blog/index.astro`)
- [x] Implement services listing page (`src/pages/services/index.astro`)
- [x] Implement blog detail pages (`src/pages/blog/[slug].astro`)
- [x] Implement services detail pages (`src/pages/services/[slug].astro`)
- [x] Add testimonials component and page (`src/pages/testimonials.astro`)
- [ ] Implement Digital Samba widget integration (`src/pages/booking.astro`) (Placeholder)
- [x] Create contact form with email notification (`src/pages/api/contact.js`) (Placeholder)
- [x] Add initial SEO optimization (Meta tags, robots.txt)
- [x] Set up basic admin layout (`src/layouts/AdminLayout.astro`)
- [x] Set up admin dashboard page (`src/pages/admin/index.astro`) (Placeholder)
- [x] Implement basic admin authentication logic (.env, bcrypt, cookies)
- [x] Implement blog post management (Admin UI & API - Basic CRUD)
- [x] Implement services management (Admin UI & API - Basic CRUD)
- [x] Implement testimonial management (Admin UI & API - Basic CRUD)
- [x] Implement event management (Model, Admin UI & API - Basic CRUD)
- [x] Implement public event pages (Listing & Detail)
- [x] Create basic analytics implementation (Admin UI & API - Basic)
- [x] Refine admin authentication (JWT implementation, logout functionality)
- [x] Upgrade Astro and resolve API route 404 errors
- [x] Implement Admin Profile Management (Model, API, Admin UI, Public Page Integration)
- [x] Implement Admin Profile Image Upload (API file handling, Admin UI update, Public display)
- [x] Implement basic "Traffic Over Time" chart on Analytics page (using Chart.js)
- [x] Replace placeholders on Admin Dashboard (`/admin`) with dynamic data (stats, recent posts, traffic chart)
- [x] Make Admin Dashboard stats cards clickable links to relevant sections
- [x] Connect public pages (Blog, Services, Testimonials, About) to fetch data from MongoDB
- [x] Implement dynamic testimonial carousel on homepage (`app/src/pages/index.astro`)

### Upcoming (Phase 3/4)
- [ ] Implement Admin Profile Image Editing Tools (e.g., crop, resize) - **High Priority**
- [ ] Refine admin UI/UX (including Analytics page date range selector, more charts, dashboard stat changes)
- [ ] Add image uploads (for other content types like blog/services if needed)
- [ ] Implement email notifications (contact form)
- [ ] Integrate Digital Samba widget

## Technology Decisions

- **Frontend Framework**: Astro (Upgraded to latest) with Astrogon theme for public site
- **Admin UI**: Flowbite components for admin dashboard
- **CSS Framework**: Tailwind CSS (integrated with Flowbite, upgraded)
- **Database**: MongoDB (running via Docker for local development) for storing coach data, bookings, events, and analytics
- **Authentication**: Simple authentication for admin area only
- **Booking System**: Digital Samba integration via widget
- **Email Service**: To be determined (options: SendGrid, Amazon SES)
- **Deployment Platform**: To be determined (options: Vercel, Netlify, DigitalOcean)

## Project Phases

### Phase 1: Core Setup and Static Pages (Completed)
- [x] Create project documentation
- [x] Define technology stack
- [x] Create architecture diagram
- [x] Initialize repository (via template cloning)
- [x] Set up base Astro project with Flowbite (via template)
- [x] Create basic project structure (cleaned and organized template)
- [x] Implement essential static pages (Home, About, Contact placeholders)
- [x] Set up responsive navigation using Flowbite components (in MainLayout)
- [x] Implement initial styling and branding (Tailwind config, Flowbite JS)

### Phase 2: Content Systems and Booking (Mostly Complete)
- [x] Set up MongoDB connection
- [x] Define MongoDB models (Blog, Service, Testimonial, Profile, PageView, Event)
- [x] Create blog content collections (schema defined)
- [x] Implement blog listing and detail pages (connected to DB)
- [x] Implement services listing and detail pages (connected to DB)
- [x] Add testimonials component and page (connected to DB)
- [x] Implement public event listing and detail pages (connected to DB)
- [ ] Implement Digital Samba widget integration (Placeholder)
- [x] Create contact form API endpoint (Placeholder)
- [x] Add initial SEO optimization

### Phase 3: Admin Interface (Largely Completed)
- [x] Create admin authentication (Basic JWT/Cookie)
- [x] Set up admin dashboard with Flowbite components (Dynamic data)
- [x] Implement blog post management (CRUD)
- [x] Implement services management (CRUD)
- [x] Implement testimonial management (CRUD)
- [x] Implement event management (CRUD)
- [x] Implement profile management (CRUD + Image Upload)
- [x] Create basic analytics implementation (Page view tracking, basic dashboard)

### Phase 4: Finalization and Launch
- [ ] Refine custom analytics dashboard (date ranges, more charts)
- [ ] Debug/Fix Admin Profile Image Cropping
- [ ] Implement Admin Profile Image Editing Tools
- [ ] Implement email notifications (contact form)
- [ ] Integrate Digital Samba widget
- [ ] Perform performance optimization
- [ ] Conduct cross-browser testing
- [ ] Ensure accessibility compliance
- [ ] Finalize SEO optimization
- [ ] Complete documentation
- [ ] Set up deployment pipeline

## Development Decisions

Document important decisions and their rationales here as the project progresses:

1. **Framework Selection**: Chosen Astro for its content-focused approach and performance benefits. Astro's partial hydration model ("islands architecture") allows for minimal JavaScript while still supporting interactive components where needed.

2. **Component Library**: Selected Flowbite for its comprehensive UI components that work well with Astro and Tailwind CSS. The Flowbite Admin Dashboard template provides a significant head start on both public and admin interfaces.

3. **Content Strategy**: Will use Astro's Content Collections for blog posts and services to leverage built-in type safety and performance benefits.

4. **Booking Integration**: Digital Samba will be integrated via their widget rather than building a custom booking system, prioritizing reliability and feature completeness over custom design.

## Open Questions/Issues

List any current questions, issues, or decisions pending resolution:

- Hosting/deployment platform selection
- Email service provider selection
- Image optimization strategy
- Authentication implementation details for admin area
- MongoDB hosting option (Decided: Docker for local, containerized deployment likely)
# - Investigate persistent `.env` loading issues in Astro SSR (Workaround implemented in `login.astro`). -> Resolved by Decision #7

## Development Decisions

Document important decisions and their rationales here as the project progresses:

1. **Framework Selection**: Chosen Astro for its content-focused approach and performance benefits. Astro's partial hydration model ("islands architecture") allows for minimal JavaScript while still supporting interactive components where needed.

2. **Component Library**: Selected Flowbite for its comprehensive UI components that work well with Astro and Tailwind CSS. The Flowbite Admin Dashboard template provides a significant head start on both public and admin interfaces.

3. **Content Strategy**: Will use Astro's Content Collections for blog posts and services to leverage built-in type safety and performance benefits.

4. **Booking Integration**: Digital Samba will be integrated via their widget rather than building a custom booking system, prioritizing reliability and feature completeness over custom design.

5. **Environment Variable Loading Workaround**: Encountered persistent issues loading `.env` variables in SSR mode via standard Astro methods (`import.meta.env`, `Astro.locals`, `vite.envDir`, `.env.development`). Implemented a workaround in `app/src/pages/admin/login.astro` to explicitly load the `.env.development` file using `dotenv` within the POST request handler. This ensures variables are available for login logic but is non-standard and may warrant further investigation later. Variables were also prefixed with `PRIVATE_` as a best practice, though this alone didn't resolve the loading issue.
6. **API Route 404 Resolution**: Persistent 404 errors on API routes (including `/api/admin/logout` and test routes like `/api/ping`) were encountered despite correct file placement, exports, configuration, and troubleshooting (cache clearing, dependency reinstall). Upgrading Astro and `@astrojs/tailwind` to the latest versions resolved the issue.
7. **MongoDB Authentication Resolution**: Resolved persistent authentication errors when connecting from API routes. The final solution involved:
    - Ensuring the Docker container was correctly configured and running (user fixed).
    - Using the standard Astro approach for server-side environment variables: prefixing sensitive variables (`MONGODB_URI`, `MONGODB_DB`) with `PRIVATE_` in `app/.env.development`.
    - Configuring `app/astro.config.mjs` to expose the `PRIVATE_` prefix via `vite.envPrefix`.
    - Reading these prefixed variables in server-side code (like `app/src/utils/db/connect.js`) using `import.meta.env`.
8. **Admin CRUD Fixes (Blog, Services, Testimonials)**:
    - Resolved Mongoose connection timeout error by switching `app/src/utils/db/connect.js` to use `mongoose.connect`.
    - Fixed `Cannot find module 'flowbite-astro'` errors in admin CRUD pages (`new.astro`, `[id].astro`) by removing the incorrect import and replacing the `<Button>` component with styled `<a>` tags.
    - Resolved Blog `slug` validation error by removing `required: true` from the model and ensuring the `pre('save')` hook generates it.
    - Added optional `slug` field to Blog admin forms (`new`, `[id]`) and updated API handlers (`POST`, `PUT`) accordingly for better SEO control.
    - Implemented inline success/error messaging (hiding form on success) for the Blog edit page (`[id].astro`) instead of using browser alerts.
    - Fixed Service `slug` validation error by removing `required: true` from the model and ensuring the `pre('save')` hook generates it.
    - Added optional `slug` field to Service admin forms (`new`, `[id]`) and updated API handlers (`POST`, `PUT`) accordingly.
    - Implemented inline success/error messaging (hiding form on success) for the Service edit page (`[id].astro`).
    - Implemented inline success/error messaging (hiding form on success) for the Testimonial edit page (`[id].astro`).
9. **Profile Image Upload Path Resolution**: Fixed broken image previews after upload by adjusting the relative path used in the API (`UPLOAD_DIR_RELATIVE`) to correctly resolve within the `app/public` directory, assuming the API's `process.cwd()` is the `app` directory. Added detailed logging to diagnose and confirm the fix. Implemented redirect-on-success in the admin profile page for robust state updates.
10. **Image Cropping Implementation (Broken - Needs Debugging)**: Added basic image cropping using Cropper.js via an Astro component (`ImageCropper.astro`). The Cropper instance appears to initialize correctly, but calling `cropperInstance.getCroppedCanvas()` results in a `TypeError: cropperInstance.getCroppedCanvas is not a function`. The preview is also not updating. This requires significant debugging, potentially exploring alternative libraries or integration methods within Astro's client-side context.
11. **Analytics Tracking in Development**: Modified `MainLayout.astro` to enable the basic page view tracking script during development (`npm run dev`) for testing purposes by removing the `import.meta.env.PROD` check. Fixed a subsequent `import.meta` error in the inline script.
12. **Homepage Content**: Replaced the "More Content Coming Soon..." placeholder on the homepage (`app/src/pages/index.astro`) with a dynamic testimonial carousel using Flowbite components, fetching data from MongoDB.

## Next Steps (Phase 3 / Refinement)

1. Set up MongoDB connection utility (`src/utils/db/connect.js`). ✅
2. Define MongoDB models (`src/utils/db/models/`). ✅
3. Implement blog listing page (`src/pages/blog/index.astro`) using content collections. ✅
4. Implement services listing page (`src/pages/services/index.astro`) using content collections. ✅
5. Implement blog detail pages (`src/pages/blog/[slug].astro`). ✅
6. Implement services detail pages (`src/pages/services/[slug].astro`). ✅
7. Add testimonials component and page (`src/pages/testimonials.astro`). ✅
8. Implement Digital Samba widget integration (`src/pages/booking.astro`) (Placeholder - Deferred).
9. Create contact form with email notification (`src/pages/api/contact.js`) (Placeholder). ✅
10. Add initial SEO optimization (Meta tags, robots.txt). ✅
11. Set up basic admin layout (`src/layouts/AdminLayout.astro`). ✅
12. Create admin authentication placeholders (`src/utils/auth/`, `src/middleware.js`, `src/pages/admin/login.astro`). ✅
13. Set up admin dashboard page (`src/pages/admin/index.astro`) (Placeholder). ✅
14. Implement basic admin authentication logic (.env, bcrypt, cookies, login page fix). ✅
15. Implement blog post management (Admin UI & API - Basic CRUD). ✅
16. Implement services management (Admin UI & API - Basic CRUD). ✅
17. Implement testimonial management (Admin UI & API - Basic CRUD). ✅
18. Create basic analytics implementation (Admin UI & API - Basic). ✅
19. Implement Admin Profile Image Upload. ✅
20. Implement basic "Traffic Over Time" chart on Analytics page. ✅
21. Replace placeholders on Admin Dashboard (`/admin`) with dynamic data. ✅
22. Make Admin Dashboard stats cards clickable links. ✅
23. Connect public pages (Blog, Services, Testimonials, About) to MongoDB. ✅
24. Implement Event Management (Model, API, Admin CRUD, Public Pages). ✅
25. **Debug & Fix Admin Profile Image Cropping** - **High Priority / Blocked** (Current Cropper.js implementation fails with `getCroppedCanvas is not a function` error).
26. Refine Admin Features / Start Phase 4 (e.g., Analytics date range, more charts, fix cropping)

---

**Last Updated**: 2025-04-30 (AM)
**Updated By**: Cline (Added Events feature)
