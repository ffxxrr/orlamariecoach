# Vercel Deployment Guide - OrlaMarieCoach

## Current Status
- ✅ Build working locally (tested successfully)
- ✅ Code pushed to GitHub (latest commit: 2c441d8)
- ❌ Vercel project not linked
- ❌ https://orlamariecoach.vercel.app returns 404

## Quick Deploy Steps

### 1. Login to Vercel CLI
```bash
vercel login
```
Follow the browser prompt to authenticate.

### 2. Link Project (First Time)
```bash
cd /home/developer/Documents/orlamariecoach
vercel link
```

You'll be asked:
- **Set up and deploy?** → Yes
- **Which scope?** → Your Vercel account/team
- **Link to existing project?** →
  - If `orlamariecoach` exists: Yes → Select it
  - If not: No → Create new
- **What's your project name?** → `orlamariecoach`
- **In which directory is your code?** → `./` (current directory)

### 3. Set Environment Variables
```bash
# Set DATABASE_URL from your .env.local
vercel env add DATABASE_URL

# Paste your PostgreSQL connection string when prompted
# Example: postgresql://user:password@host:5432/database
```

### 4. Deploy to Production
```bash
vercel --prod
```

This will:
- Build the project on Vercel
- Deploy to production
- Give you the deployment URL

## Alternative: Vercel Dashboard Method

If CLI doesn't work:

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import Git Repository:
   - Connect GitHub if not already
   - Search for `ffxxrr/orlamariecoach`
   - Click "Import"
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
5. Environment Variables:
   - Add `DATABASE_URL` with your connection string
6. Click "Deploy"

## Expected Result

After successful deployment:
- ✅ https://orlamariecoach.vercel.app → Homepage loads
- ✅ Build logs show success
- ✅ All pages accessible
- ✅ API routes working

## Troubleshooting

### If Build Fails
Check build logs for errors. Common issues:
- Missing environment variables
- Database connection (can be added after deploy)
- Build timeout (increase in project settings)

### If 404 Persists
- Check Vercel project is connected to correct repo
- Check branch is set to `feature/initial-setup` or `main`
- Verify deployment status in dashboard

### If Domain Shows Old Content
- Clear Vercel deployment cache
- Redeploy latest commit
- Check Git branch matches Vercel configuration

## Files Created for Deployment

All necessary files are ready:
- ✅ `package.json` with build scripts
- ✅ `next.config.js` configured
- ✅ `.env.example` for reference
- ✅ All dependencies installed
- ✅ Build tested locally

## What Happens on Deploy

1. Vercel clones from GitHub
2. Runs `npm install`
3. Runs `npm run build` (includes Prisma generation)
4. Deploys `.next` output
5. Makes site live at URL

## Auto-Deployment

Once linked, future pushes to GitHub will:
- Automatically trigger Vercel builds
- Deploy preview for branches
- Deploy production for main branch

---

**Ready to deploy!** Start with `vercel login` in your terminal.
