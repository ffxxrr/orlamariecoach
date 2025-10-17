import { NextResponse } from 'next/server'
import { projectStatus } from '@/lib/project-status'
import type { FeedbackItem } from '@/lib/project-status'
import prisma from '@/lib/db'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const timestamp = new Date().toISOString()
    const feedbackId = `feedback-${Date.now()}`

    // Store in database for persistence
    const dbFeedback = await prisma.feedback.create({
      data: {
        page: body.page,
        type: body.type || 'general',
        message: body.message || body.description,
        priority: body.priority || 'medium',
        status: 'new',
        userEmail: body.userEmail || body.email || null,
        userName: body.userName || null,
        screenshot: body.screenshot || null,
        browserInfo: body.browserInfo || null,
        metadata: body.metadata || null,
      }
    })

    // Also keep in project status for backward compatibility
    const feedback: FeedbackItem = {
      id: feedbackId,
      page: body.page,
      element: body.element,
      type: body.type || 'general',
      priority: body.priority || 'medium',
      description: body.message || body.description,
      suggestedFix: body.suggestedFix,
      createdBy: body.userEmail || body.email || 'stakeholder',
      createdAt: timestamp,
      status: 'new'
    }

    projectStatus.addFeedback(feedback)

    // Sync to Obsidian for stakeholder review
    await syncFeedbackToObsidian(feedback, body)

    return NextResponse.json({
      success: true,
      id: dbFeedback.id,
      message: 'Feedback submitted successfully'
    })

  } catch (error) {
    console.error('Error processing feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

async function syncFeedbackToObsidian(feedback: FeedbackItem, metadata: any) {
  try {
    const obsidianPath = '/home/developer/Documents/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website'
    const feedbackDir = path.join(obsidianPath, '06-Meetings/Stakeholder-Feedback')
    const todayFile = path.join(feedbackDir, `${new Date().toISOString().split('T')[0]}-feedback.md`)

    // Ensure directory exists
    if (!fs.existsSync(feedbackDir)) {
      fs.mkdirSync(feedbackDir, { recursive: true })
    }

    // Create or append to today's feedback file
    const feedbackEntry = `
## Feedback Item #${feedback.id}
**Time:** ${new Date(feedback.createdAt).toLocaleString()}  
**Page:** ${feedback.page}  
**Type:** ${feedback.type}  
**Priority:** ${feedback.priority}  
${feedback.element ? `**Element:** ${feedback.element}  ` : ''}

### Description
${feedback.description}

${feedback.suggestedFix ? `### Suggested Solution\n${feedback.suggestedFix}\n` : ''}

### Technical Details
- **URL:** ${metadata.url}
- **Browser:** ${metadata.userAgent}
- **Viewport:** ${metadata.viewport}
- **Status:** ${feedback.status}

---
`

    // Check if file exists and append, or create new
    if (fs.existsSync(todayFile)) {
      fs.appendFileSync(todayFile, feedbackEntry)
    } else {
      const header = `# Stakeholder Feedback - ${new Date().toLocaleDateString()}

*This file contains feedback collected from the preview deployment.*

---
`
      fs.writeFileSync(todayFile, header + feedbackEntry)
    }

    // Update the main feedback tracking file
    const mainFeedbackFile = path.join(obsidianPath, 'STAKEHOLDER-FEEDBACK-TRACKER.md')
    await updateMainFeedbackTracker(mainFeedbackFile, feedback)

  } catch (error) {
    console.error('Error syncing to Obsidian:', error)
  }
}

async function updateMainFeedbackTracker(filePath: string, feedback: FeedbackItem) {
  try {
    let content = ''
    
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath, 'utf-8')
    } else {
      content = `# Stakeholder Feedback Tracker

This file tracks all feedback from Orla and stakeholders during the preview phase.

## Feedback Summary

| ID | Date | Page | Type | Priority | Status | Description |
|---|---|---|---|---|---|---|
`
    }

    // Add new feedback row to the table
    const date = new Date(feedback.createdAt).toLocaleDateString()
    const shortDesc = feedback.description.length > 50 
      ? feedback.description.substring(0, 50) + '...'
      : feedback.description
    
    const newRow = `| ${feedback.id} | ${date} | ${feedback.page} | ${feedback.type} | ${feedback.priority} | ${feedback.status} | ${shortDesc} |`
    
    content += '\n' + newRow

    fs.writeFileSync(filePath, content)

  } catch (error) {
    console.error('Error updating main feedback tracker:', error)
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const page = searchParams.get('page')
    const priority = searchParams.get('priority')

    // Build filter object
    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type
    if (page) where.page = page
    if (priority) where.priority = priority

    // Fetch from database
    const feedback = await prisma.feedback.findMany({
      where,
      orderBy: [
        { createdAt: 'desc' }
      ],
    })

    // Get counts by status
    const newCount = await prisma.feedback.count({ where: { status: 'new' } })
    const acknowledgedCount = await prisma.feedback.count({ where: { status: 'acknowledged' } })
    const inProgressCount = await prisma.feedback.count({ where: { status: 'in-progress' } })
    const resolvedCount = await prisma.feedback.count({ where: { status: 'resolved' } })
    const wontFixCount = await prisma.feedback.count({ where: { status: 'wont-fix' } })

    return NextResponse.json({
      success: true,
      feedback,
      total: feedback.length,
      stats: {
        byStatus: {
          new: newCount,
          acknowledged: acknowledgedCount,
          inProgress: inProgressCount,
          resolved: resolvedCount,
          wontFix: wontFixCount
        }
      }
    })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}