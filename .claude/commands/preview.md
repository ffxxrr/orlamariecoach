# Preview Changes on Staging

Put the current changes on the staging site so Orla can check them.

## Tasks

1. **Check** - Run `npm run type-check` and `npm run build`. Fix any errors before going further.

2. **Summarise** - Tell Orla in plain language what's about to go to staging (what she'll see, on which pages).

3. **Commit & push** - Make sure you're on `main`, then commit with a descriptive message and `git push origin main`.

4. **Wait for staging** - Vercel takes about 2 minutes. Check with:
   ```
   gh api repos/ffxxrr/orlamariecoach/commits/$(git rev-parse HEAD)/status -q .state
   ```
   Repeat until it says `success` (or `failure`, in which case look at the Vercel build error and fix it).

5. **Give the link** - Share the staging URL for each page that changed, e.g. https://orlamariecoach.vercel.app/about. Remind her this is not the live site yet, and that `/publish` puts it live when she's happy.
