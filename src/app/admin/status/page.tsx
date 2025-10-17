'use client'

import { useState, useEffect } from 'react'
import { projectStatus } from '@/lib/project-status'
import type { ProjectStatus, FeedbackItem, TaskItem } from '@/lib/project-status'
import { AlertCircle, CheckCircle, Clock, Download, RefreshCw } from 'lucide-react'

export default function StatusDashboard() {
  const [status, setStatus] = useState<ProjectStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastSync, setLastSync] = useState<string>('')

  useEffect(() => {
    loadStatus()
  }, [])

  const loadStatus = async () => {
    try {
      setLoading(true)
      // In a real implementation, this would come from an API endpoint
      const currentStatus = projectStatus.getStatus()
      setStatus(currentStatus)
      setLastSync(new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Error loading status:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTaskStatus = async (taskId: string, newStatus: TaskItem['status']) => {
    if (!status) return

    projectStatus.updateTask(taskId, { status: newStatus })
    await loadStatus()
    
    // Sync to Obsidian
    await syncToObsidian()
  }

  const updateFeedbackStatus = async (feedbackId: string, newStatus: FeedbackItem['status']) => {
    if (!status) return

    projectStatus.updateFeedback(feedbackId, { 
      status: newStatus,
      resolvedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
    })
    await loadStatus()

    // Sync to Obsidian
    await syncToObsidian()
  }

  const syncToObsidian = async () => {
    try {
      // This would trigger a sync to update Obsidian files
      const response = await fetch('/api/status/sync-obsidian', {
        method: 'POST'
      })
      if (response.ok) {
        console.log('Synced to Obsidian successfully')
      }
    } catch (error) {
      console.error('Error syncing to Obsidian:', error)
    }
  }

  const downloadReport = () => {
    if (!status) return

    const report = projectStatus.generateStatusReport()
    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `project-status-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading project status...</span>
        </div>
      </div>
    )
  }

  if (!status) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Status</h2>
          <button
            onClick={loadStatus}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const realProgress = projectStatus.calculateRealProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Project Status Dashboard</h1>
              <p className="text-gray-600">OrlaMarieCoach Website Development</p>
              <p className="text-sm text-gray-500">Last synced: {lastSync}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadStatus}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={downloadReport}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-medium text-gray-700">{realProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                style={{ width: `${realProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Current Phase: {status.currentPhase}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tasks */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Pending Tasks ({status.pendingTasks.length})
            </h2>
            <div className="space-y-3">
              {status.pendingTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{task.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          task.status === 'blocked' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value as TaskItem['status'])}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="blocked">Blocked</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Recent Feedback ({status.feedback.length})
            </h2>
            <div className="space-y-3">
              {status.feedback.slice(-5).map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{feedback.page}</h3>
                        {feedback.element && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {feedback.element}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{feedback.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          feedback.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          feedback.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {feedback.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          feedback.type === 'bug' ? 'bg-red-100 text-red-800' :
                          feedback.type === 'enhancement' ? 'bg-blue-100 text-blue-800' :
                          feedback.type === 'design' ? 'bg-purple-100 text-purple-800' :
                          feedback.type === 'content' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {feedback.type}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <select
                        value={feedback.status}
                        onChange={(e) => updateFeedbackStatus(feedback.id, e.target.value as FeedbackItem['status'])}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="wont_fix">Won't Fix</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analytics Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics Implementation</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Status</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  status.analytics.implemented 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.analytics.implemented ? 'Implemented' : 'Not Implemented'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Progress</span>
                <span className="font-medium">{status.analytics.progress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Remaining Time</span>
                <span className="font-medium">{status.analytics.remainingWeeks} weeks</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${status.analytics.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Blockers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Current Blockers ({status.blockers.length})
            </h2>
            <div className="space-y-3">
              {status.blockers.map((blocker) => (
                <div key={blocker.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-red-900">{blocker.title}</h3>
                      <p className="text-sm text-red-700 mt-1">{blocker.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          blocker.severity === 'critical' ? 'bg-red-200 text-red-900' :
                          blocker.severity === 'high' ? 'bg-orange-200 text-orange-900' :
                          'bg-yellow-200 text-yellow-900'
                        }`}>
                          {blocker.severity}
                        </span>
                        <span className="text-xs text-red-600">
                          Since: {new Date(blocker.dateIdentified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Obsidian Integration Status */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium text-blue-900">Obsidian Vault Integration</h3>
          </div>
          <p className="text-sm text-blue-800">
            All feedback and status updates are automatically synced to the Obsidian vault at{' '}
            <code className="bg-blue-100 px-1 rounded">
              /Obsidian Vault/01-Projects/Personal/OrlaMarieCoach-Website/
            </code>
          </p>
          <ul className="text-sm text-blue-700 mt-2 ml-4 list-disc">
            <li>Daily feedback files in <code>06-Meetings/Stakeholder-Feedback/</code></li>
            <li>Main tracker updated in <code>STAKEHOLDER-FEEDBACK-TRACKER.md</code></li>
            <li>Project status synced with existing planning documents</li>
          </ul>
        </div>
      </div>
    </div>
  )
}