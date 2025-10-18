# Stakeholder Feedback System

## Overview

A comprehensive feedback collection system for gathering stakeholder input on the preview deployment. Feedback is stored in multiple locations for persistence across development sessions:

1. **PostgreSQL Database** (via Prisma) - Primary persistent storage
2. **JSON File** (`project-status.json`) - Local backup and quick access
3. **Obsidian Vault** - Automatically synced for stakeholder review workflows

## Features

- ✅ **Floating Feedback Widget** - Non-intrusive button on every page
- ✅ **Preview Mode Banner** - Visual indicator that feedback is welcome
- ✅ **Categorized Feedback** - Bug, enhancement, design, content, general
- ✅ **Priority Levels** - Critical, high, medium, low
- ✅ **Admin Dashboard** - Comprehensive review and management interface
- ✅ **Triple Storage** - Database + JSON + Obsidian for maximum persistence
- ✅ **Browser Context** - Automatic capture of technical details for bug reports
- ✅ **Email Follow-up** - Optional contact information collection

## How Stakeholders Submit Feedback

### On the Preview Site

1. Visit the preview site at: **https://orlamariecoach.vercel.app/**
2. Look for the **floating feedback button** in the bottom-right corner (green circular button)
3. Click the button to open the feedback form
4. Fill out the form:
   - **Type**: Bug, Enhancement, Design, Content, or General
   - **Priority**: How urgent is this?
   - **Element** (optional): Which specific component?
   - **Description**: What's your feedback?
   - **Suggested Fix** (optional): Do you have ideas for improvement?
   - **Email** (optional): For follow-up questions
5. Click **"Send Feedback"**
6. You'll see a confirmation message

### Preview Mode

The preview site displays a blue banner at the top indicating "PREVIEW MODE - Share your feedback below" to encourage stakeholder participation.

## How You Review Feedback

### Option 1: Admin Dashboard (Recommended)

1. Navigate to: `http://localhost:3004/admin/feedback`
2. View all feedback with:
   - Statistics by status (New, Acknowledged, In Progress, Resolved, Won't Fix)
   - Filter by status, type, or priority
   - Quick status updates with dropdown menus
   - Technical details for bug reports
   - Stakeholder contact information

### Option 2: Project Status Dashboard

1. Navigate to: `http://localhost:3004/admin/status`
2. Scroll to the "Recent Feedback" section
3. See the latest 5 feedback items with quick status updates

### Option 3: Obsidian Vault Integration

All feedback is automatically synced to your Obsidian vault:

```
/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website/
├── 06-Meetings/Stakeholder-Feedback/
│   └── YYYY-MM-DD-feedback.md (daily files)
└── STAKEHOLDER-FEEDBACK-TRACKER.md (main tracker)
```

**Daily Feedback Files**: Each day's feedback is appended to a dated file with full details.

**Main Tracker**: A markdown table summarizing all feedback for quick overview.

### Option 4: Direct Database Query

Using Prisma Studio:
```bash
npm run db:studio
```

Then navigate to the `Feedback` table.

### Option 5: API Access

Fetch all feedback:
```bash
curl http://localhost:3004/api/feedback
```

Filter feedback:
```bash
curl "http://localhost:3004/api/feedback?status=new&priority=high"
```

## Database Schema

```prisma
model Feedback {
  id          String   @id @default(uuid())
  page        String   // Which page the feedback was submitted from
  type        String   // bug, suggestion, design, content, other
  message     String
  priority    String   @default("medium") // low, medium, high, critical
  status      String   @default("new") // new, acknowledged, in-progress, resolved, wont-fix
  userEmail   String?  // Optional stakeholder email for follow-up
  userName    String?  // Optional stakeholder name
  screenshot  String?  // Optional screenshot URL
  browserInfo Json?    // Browser/device details for bug reports
  metadata    Json?    // Additional context (viewport size, URL params, etc.)
  adminNotes  String?  // Internal notes from review
  resolvedAt  DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## API Endpoints

### Submit Feedback
```
POST /api/feedback
Content-Type: application/json

{
  "page": "/services",
  "type": "design",
  "message": "The header looks too bold on mobile",
  "priority": "medium",
  "userEmail": "orla@example.com",
  "userName": "Orla"
}
```

### Get All Feedback
```
GET /api/feedback
GET /api/feedback?status=new
GET /api/feedback?type=bug&priority=high
```

### Update Feedback Status
```
PATCH /api/feedback/:id
Content-Type: application/json

{
  "status": "in-progress",
  "adminNotes": "Working on this fix"
}
```

### Delete Feedback
```
DELETE /api/feedback/:id
```

## Feedback Lifecycle

1. **New** → Feedback just submitted
2. **Acknowledged** → You've seen it and noted it
3. **In Progress** → Actively working on it
4. **Resolved** → Fixed/implemented
5. **Won't Fix** → Decided not to implement

## Managing Feedback in Claude Code Sessions

### Accessing Feedback in New Sessions

Since feedback persists in the database, you can access it in any future Claude Code session:

```typescript
import prisma from '@/lib/db'

// Get all new feedback
const newFeedback = await prisma.feedback.findMany({
  where: { status: 'new' },
  orderBy: { createdAt: 'desc' }
})

// Get high-priority items
const urgent = await prisma.feedback.findMany({
  where: { priority: { in: ['high', 'critical'] } }
})

// Get feedback for specific page
const homepageFeedback = await prisma.feedback.findMany({
  where: { page: '/' }
})
```

### Quick Review Command

Add this to your workflow:

```bash
# In a new Claude Code session, simply ask:
"Show me all new stakeholder feedback"

# Or:
"What high-priority feedback do we have?"
```

Claude Code will query the database and show you the results.

## Integration with Development Workflow

### Before Starting Work

1. Check for new feedback: `http://localhost:3004/admin/feedback`
2. Prioritize by urgency and type
3. Update status to "In Progress" for items you're working on
4. Check Obsidian vault for any additional context from stakeholder meetings

### After Completing Work

1. Update feedback status to "Resolved"
2. Add admin notes with what was changed
3. The feedback remains in the database for future reference

## Exporting Feedback

### For Reports

Visit `/admin/status` and click "Export Report" to download a markdown summary including all feedback.

### For Analysis

Query the database directly:
```bash
npx prisma studio
```

Or export as JSON:
```bash
curl http://localhost:3004/api/feedback > feedback-backup.json
```

## Preview Environment Variables

To enable the feedback widget on production (not recommended unless you want public feedback):

```env
NEXT_PUBLIC_PREVIEW_MODE=true
```

By default, the widget only appears in:
- Development environment (`npm run dev`)
- When `NEXT_PUBLIC_PREVIEW_MODE=true`

## Troubleshooting

### Widget Not Appearing

1. Check you're on a non-admin page (widget hides on `/admin/*` routes)
2. Verify you're in development or preview mode
3. Check the FeedbackProvider is in the layout (it is)

### Feedback Not Saving

1. Ensure database is running: `docker compose ps`
2. Check Prisma connection: `npx prisma db push`
3. View browser console for API errors

### Obsidian Sync Not Working

1. Verify the Obsidian vault path in `/api/feedback/route.ts`
2. Check file permissions for the vault directory
3. Feedback will still save to database even if Obsidian sync fails

## Next Steps

1. **Share the preview link** with Orla: https://orlamariecoach.vercel.app/
2. **Ask her to provide feedback** using the widget on each page
3. **Review feedback** regularly at `/admin/feedback`
4. **Implement changes** based on priority
5. **Update status** as you work through items

## Summary

You now have a production-ready feedback system that:
- ✅ Persists across all development sessions (database storage)
- ✅ Syncs to your Obsidian vault for workflow integration
- ✅ Provides a beautiful stakeholder interface
- ✅ Offers comprehensive admin tools
- ✅ Captures technical context automatically
- ✅ Works on the live preview deployment

The feedback system is fully functional and ready for stakeholder use!
