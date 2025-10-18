import { NextResponse } from 'next/server'
import { projectStatus } from '@/lib/project-status'
import fs from 'fs'
import path from 'path'

export async function POST() {
  try {
    const status = projectStatus.getStatus()
    const obsidianPath = '/home/developer/Documents/Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website'

    // Update main project overview
    await updateProjectOverview(obsidianPath, status)
    
    // Update current focus
    await updateCurrentFocus(obsidianPath, status)
    
    // Update tasks tracker
    await updateTasksTracker(obsidianPath, status)
    
    // Create daily status update
    await createDailyStatusUpdate(obsidianPath, status)

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully synced to Obsidian vault',
      updatedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error syncing to Obsidian:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sync to Obsidian' },
      { status: 500 }
    )
  }
}

async function updateProjectOverview(obsidianPath: string, status: any) {
  const filePath = path.join(obsidianPath, '📋 PROJECT-OVERVIEW.md')
  
  if (!fs.existsSync(filePath)) {
    console.warn('PROJECT-OVERVIEW.md not found, skipping update')
    return
  }

  let content = fs.readFileSync(filePath, 'utf-8')
  
  // Update the project health section
  const realProgress = projectStatus.calculateRealProgress()
  const healthRegex = /## 🚦 Project Health:[\s\S]*?\n\n/
  const newHealth = `## 🚦 Project Health: **${getHealthStatus(realProgress)}** ${getHealthEmoji(realProgress)} **AUTO-UPDATED**

**Current Phase:** ${status.currentPhase}
**Overall Progress:** **${realProgress}%** complete 📈 **(Real-time tracking active)**
**Timeline Status:** 📅 **UPDATED** - See resurrection roadmap
**Next Milestone:** ${getNextMilestone(status)}

`

  if (healthRegex.test(content)) {
    content = content.replace(healthRegex, newHealth)
  } else {
    // Add after the title if health section doesn't exist
    content = content.replace(/---\n/, `---\n\n${newHealth}---\n`)
  }

  // Update the analytics section
  const analyticsRegex = /### Analytics Implementation:[\s\S]*?\n\n/
  const newAnalytics = `### Analytics Implementation:
- Implemented: ${status.analytics.implemented ? 'Yes ✅' : 'No ❌'}
- Progress: ${status.analytics.progress}%
- Remaining: ${status.analytics.remainingWeeks} weeks

`

  if (analyticsRegex.test(content)) {
    content = content.replace(analyticsRegex, newAnalytics)
  }

  fs.writeFileSync(filePath, content)
}

async function updateCurrentFocus(obsidianPath: string, status: any) {
  const filePath = path.join(obsidianPath, '🎯 CURRENT-FOCUS.md')
  
  if (!fs.existsSync(filePath)) {
    console.warn('CURRENT-FOCUS.md not found, skipping update')
    return
  }

  let content = fs.readFileSync(filePath, 'utf-8')
  
  // Update the progress section
  const realProgress = projectStatus.calculateRealProgress()
  const progressRegex = /\*\*Current Overall Progress: \d+%\*\*/
  const newProgress = `**Current Overall Progress: ${realProgress}%**`
  
  content = content.replace(progressRegex, newProgress)

  // Add live update timestamp
  const timestampRegex = /\*Last Updated: .*?\*/
  const newTimestamp = `*Last Updated: ${new Date().toLocaleString()} (Auto-sync)*`
  
  if (timestampRegex.test(content)) {
    content = content.replace(timestampRegex, newTimestamp)
  } else {
    content = content.replace(/^# /, `*${newTimestamp}*\n\n# `)
  }

  fs.writeFileSync(filePath, content)
}

async function updateTasksTracker(obsidianPath: string, status: any) {
  const tasksDir = path.join(obsidianPath, '07-Tasks')
  const filePath = path.join(tasksDir, 'LIVE-TASKS-TRACKER.md')

  if (!fs.existsSync(tasksDir)) {
    fs.mkdirSync(tasksDir, { recursive: true })
  }

  const content = `# Live Tasks Tracker
*Auto-updated from development system*  
*Last sync: ${new Date().toLocaleString()}*

## Pending Tasks (${status.pendingTasks.length})

${status.pendingTasks.map((task: any) => `
### ${task.title}
- **ID:** ${task.id}
- **Priority:** ${task.priority}
- **Status:** ${task.status}
- **Description:** ${task.description}
${task.dueDate ? `- **Due Date:** ${task.dueDate}` : ''}
${task.notes ? `- **Notes:** ${task.notes}` : ''}
`).join('\n')}

## Completed Tasks (${status.completedTasks.length})

${status.completedTasks.slice(-5).map((task: any) => `
### ${task.title} ✅
- **Completed:** ${task.completedDate ? new Date(task.completedDate).toLocaleDateString() : 'Unknown'}
- **Priority:** ${task.priority}
`).join('\n')}

## Current Blockers (${status.blockers.length})

${status.blockers.map((blocker: any) => `
### ⚠️ ${blocker.title}
- **Severity:** ${blocker.severity}
- **Identified:** ${new Date(blocker.dateIdentified).toLocaleDateString()}
- **Description:** ${blocker.description}
${blocker.resolution ? `- **Resolution:** ${blocker.resolution}` : ''}
`).join('\n')}

---
*This file is automatically updated when tasks are modified in the development system.*
`

  fs.writeFileSync(filePath, content)
}

async function createDailyStatusUpdate(obsidianPath: string, status: any) {
  const updatesDir = path.join(obsidianPath, 'Progress-Tracking/Daily-Updates')
  const today = new Date().toISOString().split('T')[0]
  const filePath = path.join(updatesDir, `${today}-auto-update.md`)

  if (!fs.existsSync(updatesDir)) {
    fs.mkdirSync(updatesDir, { recursive: true })
  }

  // Only create if it doesn't exist (one per day)
  if (fs.existsSync(filePath)) {
    return
  }

  const realProgress = projectStatus.calculateRealProgress()
  const report = projectStatus.generateStatusReport()

  const content = `# Daily Status Update - ${new Date().toLocaleDateString()}
*Auto-generated from development system*

## Summary
- **Overall Progress:** ${realProgress}%
- **Current Phase:** ${status.currentPhase}
- **Active Tasks:** ${status.pendingTasks.length}
- **Recent Feedback:** ${status.feedback.length} items
- **Blockers:** ${status.blockers.length}

## Analytics Status
- **Implemented:** ${status.analytics.implemented ? 'Yes' : 'No'}
- **Progress:** ${status.analytics.progress}%
- **Remaining:** ${status.analytics.remainingWeeks} weeks

## Recent Activity
${status.feedback.slice(-3).map((f: any) => `- New feedback on ${f.page}: ${f.description.substring(0, 100)}...`).join('\n')}

## Next Actions
${status.pendingTasks.slice(0, 3).map((t: any) => `- [${t.priority.toUpperCase()}] ${t.title}`).join('\n')}

---

## Full Technical Report

\`\`\`
${report}
\`\`\`

---
*Generated: ${new Date().toLocaleString()}*
`

  fs.writeFileSync(filePath, content)
}

function getHealthStatus(progress: number): string {
  if (progress >= 90) return 'EXCELLENT'
  if (progress >= 70) return 'ON TRACK'
  if (progress >= 50) return 'PROGRESSING'
  return 'NEEDS ATTENTION'
}

function getHealthEmoji(progress: number): string {
  if (progress >= 90) return '🚀'
  if (progress >= 70) return '✅'
  if (progress >= 50) return '🔄'
  return '⚠️'
}

function getNextMilestone(status: any): string {
  if (!status.analytics.implemented) {
    return 'Analytics MVP Complete (5-7 weeks remaining)'
  }
  return 'Production Launch Preparation'
}