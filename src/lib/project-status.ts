/**
 * Project Status Persistence System
 * Maintains project state between development sessions
 */

import fs from 'fs'
import path from 'path'

export interface ProjectStatus {
  lastUpdated: string
  currentPhase: string
  completionPercentage: number
  activeFeatures: string[]
  pendingTasks: TaskItem[]
  completedTasks: TaskItem[]
  blockers: BlockerItem[]
  deployments: DeploymentInfo[]
  feedback: FeedbackItem[]
  analytics: {
    implemented: boolean
    progress: number
    remainingWeeks: number
  }
}

export interface TaskItem {
  id: string
  title: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'pending' | 'in_progress' | 'completed' | 'blocked'
  assignee?: string
  dueDate?: string
  completedDate?: string
  notes?: string
}

export interface BlockerItem {
  id: string
  title: string
  description: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  dateIdentified: string
  resolution?: string
  resolvedDate?: string
}

export interface DeploymentInfo {
  environment: 'development' | 'preview' | 'production'
  url: string
  version: string
  deployedAt: string
  status: 'active' | 'failed' | 'building'
  notes?: string
}

export interface FeedbackItem {
  id: string
  page: string
  element?: string
  type: 'bug' | 'enhancement' | 'design' | 'content' | 'general'
  priority: 'critical' | 'high' | 'medium' | 'low'
  description: string
  suggestedFix?: string
  screenshot?: string
  createdBy: string
  createdAt: string
  status: 'new' | 'reviewing' | 'in_progress' | 'completed' | 'wont_fix'
  resolution?: string
  resolvedAt?: string
}

class ProjectStatusManager {
  private statusFilePath: string
  private status: ProjectStatus

  constructor() {
    this.statusFilePath = path.join(process.cwd(), 'project-status.json')
    this.status = this.loadStatus()
  }

  private loadStatus(): ProjectStatus {
    try {
      if (fs.existsSync(this.statusFilePath)) {
        const data = fs.readFileSync(this.statusFilePath, 'utf-8')
        return JSON.parse(data)
      }
    } catch (error) {
      console.error('Error loading project status:', error)
    }

    // Return default status if file doesn't exist or has errors
    return this.getDefaultStatus()
  }

  private getDefaultStatus(): ProjectStatus {
    return {
      lastUpdated: new Date().toISOString(),
      currentPhase: 'Analytics Implementation Pending',
      completionPercentage: 65,
      activeFeatures: [
        'Homepage',
        'About Page',
        'Services Page',
        'Courses Page',
        'Contact Page',
        'Book Session Page',
        'Celtic Branding',
        'OM Method Integration',
        'Audio Player',
        'Mobile Responsive Design'
      ],
      pendingTasks: [
        {
          id: 'analytics-mvp',
          title: 'Implement Progressive MVP Analytics',
          description: 'Complete the approved 5-7 week analytics implementation plan',
          priority: 'critical',
          status: 'pending',
          dueDate: '2025-12-06'
        },
        {
          id: 'digital-samba',
          title: 'Digital Samba Integration',
          description: 'Connect booking system API',
          priority: 'high',
          status: 'pending'
        },
        {
          id: 'stripe-payment',
          title: 'Stripe Payment Integration',
          description: 'Set up payment processing for courses and sessions',
          priority: 'high',
          status: 'pending'
        },
        {
          id: 'production-deploy',
          title: 'Fix Production Deployment',
          description: 'Resolve Vercel domain mapping 404 issue',
          priority: 'critical',
          status: 'pending'
        }
      ],
      completedTasks: [],
      blockers: [
        {
          id: 'analytics-gap',
          title: 'Analytics System Not Implemented',
          description: 'Custom analytics approved May 30, 2025 but never built (35% of project scope)',
          severity: 'critical',
          dateIdentified: '2025-05-30'
        },
        {
          id: 'domain-404',
          title: 'Production Domain Returns 404',
          description: 'orlamariecoach.com not properly configured on Vercel',
          severity: 'high',
          dateIdentified: '2025-05-29'
        }
      ],
      deployments: [
        {
          environment: 'development',
          url: 'http://localhost:3004',
          version: '0.1.0',
          deployedAt: new Date().toISOString(),
          status: 'active'
        },
        {
          environment: 'preview',
          url: 'https://orlamariecoach-preview.vercel.app',
          version: '0.1.0',
          deployedAt: new Date().toISOString(),
          status: 'active',
          notes: 'For stakeholder review and feedback'
        }
      ],
      feedback: [],
      analytics: {
        implemented: false,
        progress: 0,
        remainingWeeks: 7
      }
    }
  }

  public saveStatus(): void {
    try {
      this.status.lastUpdated = new Date().toISOString()
      fs.writeFileSync(
        this.statusFilePath,
        JSON.stringify(this.status, null, 2),
        'utf-8'
      )
    } catch (error) {
      console.error('Error saving project status:', error)
    }
  }

  public getStatus(): ProjectStatus {
    return this.status
  }

  public updateStatus(updates: Partial<ProjectStatus>): void {
    this.status = { ...this.status, ...updates }
    this.saveStatus()
  }

  public addTask(task: TaskItem): void {
    this.status.pendingTasks.push(task)
    this.saveStatus()
  }

  public updateTask(taskId: string, updates: Partial<TaskItem>): void {
    const taskIndex = this.status.pendingTasks.findIndex(t => t.id === taskId)
    if (taskIndex !== -1) {
      this.status.pendingTasks[taskIndex] = {
        ...this.status.pendingTasks[taskIndex],
        ...updates
      }
      
      // Move to completed if status is completed
      if (updates.status === 'completed') {
        const task = this.status.pendingTasks.splice(taskIndex, 1)[0]
        task.completedDate = new Date().toISOString()
        this.status.completedTasks.push(task)
      }
      
      this.saveStatus()
    }
  }

  public addFeedback(feedback: FeedbackItem): void {
    this.status.feedback.push(feedback)
    this.saveStatus()
  }

  public updateFeedback(feedbackId: string, updates: Partial<FeedbackItem>): void {
    const index = this.status.feedback.findIndex(f => f.id === feedbackId)
    if (index !== -1) {
      this.status.feedback[index] = {
        ...this.status.feedback[index],
        ...updates
      }
      this.saveStatus()
    }
  }

  public calculateRealProgress(): number {
    const weights = {
      coreWebsite: 0.65,  // 65% of project
      analytics: 0.35     // 35% of project
    }

    const coreProgress = 0.90  // 90% complete
    const analyticsProgress = this.status.analytics.progress / 100

    return Math.round((weights.coreWebsite * coreProgress + weights.analytics * analyticsProgress) * 100)
  }

  public generateStatusReport(): string {
    const realProgress = this.calculateRealProgress()
    const report = `
# Project Status Report
Generated: ${new Date().toLocaleString()}

## Overall Progress: ${realProgress}%

### Current Phase: ${this.status.currentPhase}

### Active Features:
${this.status.activeFeatures.map(f => `✅ ${f}`).join('\n')}

### Pending Tasks (${this.status.pendingTasks.length}):
${this.status.pendingTasks.map(t => `- [${t.priority.toUpperCase()}] ${t.title} (${t.status})`).join('\n')}

### Blockers (${this.status.blockers.length}):
${this.status.blockers.map(b => `⚠️ [${b.severity.toUpperCase()}] ${b.title}`).join('\n')}

### Recent Feedback (${this.status.feedback.length} items):
${this.status.feedback.slice(-5).map(f => `- [${f.priority}] ${f.page}: ${f.description}`).join('\n')}

### Analytics Implementation:
- Implemented: ${this.status.analytics.implemented ? 'Yes' : 'No'}
- Progress: ${this.status.analytics.progress}%
- Remaining: ${this.status.analytics.remainingWeeks} weeks

### Deployments:
${this.status.deployments.map(d => `- ${d.environment}: ${d.url} (${d.status})`).join('\n')}
    `
    return report.trim()
  }
}

// Export singleton instance
export const projectStatus = new ProjectStatusManager()

// Helper functions for common operations
export function addFeedback(
  page: string,
  description: string,
  type: FeedbackItem['type'] = 'general',
  priority: FeedbackItem['priority'] = 'medium'
): void {
  const feedback: FeedbackItem = {
    id: `feedback-${Date.now()}`,
    page,
    type,
    priority,
    description,
    createdBy: 'stakeholder',
    createdAt: new Date().toISOString(),
    status: 'new'
  }
  projectStatus.addFeedback(feedback)
}

export function updateTaskStatus(taskId: string, status: TaskItem['status']): void {
  projectStatus.updateTask(taskId, { status })
}

export function getStatusReport(): string {
  return projectStatus.generateStatusReport()
}