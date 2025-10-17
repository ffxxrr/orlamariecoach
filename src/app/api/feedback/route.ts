import { NextResponse } from 'next/server'
import { projectStatus } from '@/lib/project-status'
import type { FeedbackItem } from '@/lib/project-status'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const feedback: FeedbackItem = {
      id: `feedback-${Date.now()}`,
      page: body.page,
      element: body.element,
      type: body.type,
      priority: body.priority,
      description: body.description,
      suggestedFix: body.suggestedFix,
      createdBy: body.email || 'stakeholder',
      createdAt: body.createdAt,
      status: 'new'
    }

    // Add to project status system
    projectStatus.addFeedback(feedback)

    // Also create/update Obsidian feedback file
    await syncFeedbackToObsidian(feedback, body)

    return NextResponse.json({ 
      success: true, 
      id: feedback.id,
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

export async function GET() {
  try {
    const status = projectStatus.getStatus()
    return NextResponse.json({
      feedback: status.feedback,
      total: status.feedback.length,
      newCount: status.feedback.filter(f => f.status === 'new').length,
      inProgressCount: status.feedback.filter(f => f.status === 'in_progress').length,
      completedCount: status.feedback.filter(f => f.status === 'completed').length
    })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}