'use client'

import { useState, useEffect } from 'react'
import {
  MessageSquare, RefreshCw, Filter, Bug, Lightbulb,
  Palette, FileText, AlertCircle
} from 'lucide-react'

interface Feedback {
  id: string
  page: string
  type: string
  message: string
  priority: string
  status: string
  userEmail?: string | null
  userName?: string | null
  browserInfo?: any
  metadata?: any
  createdAt: string
  updatedAt: string
}

interface FeedbackStats {
  byStatus: {
    new: number
    acknowledged: number
    inProgress: number
    resolved: number
    wontFix: number
  }
}

const TYPE_ICONS: Record<string, any> = {
  bug: { icon: Bug, color: 'text-red-600', bg: 'bg-red-100' },
  suggestion: { icon: Lightbulb, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  design: { icon: Palette, color: 'text-purple-600', bg: 'bg-purple-100' },
  content: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
  other: { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100' },
}

const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
}

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  acknowledged: 'bg-purple-100 text-purple-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  'wont-fix': 'bg-gray-100 text-gray-800',
}

export default function FeedbackAdmin() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [stats, setStats] = useState<FeedbackStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    priority: '',
  })

  useEffect(() => {
    loadFeedback()
  }, [filters])

  const loadFeedback = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.type) params.append('type', filters.type)
      if (filters.priority) params.append('priority', filters.priority)

      const response = await fetch(`/api/feedback?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch feedback')

      const data = await response.json()
      setFeedback(data.feedback || [])
      setStats(data.stats || null)
    } catch (error) {
      console.error('Error loading feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (feedbackId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        await loadFeedback()
      }
    } catch (error) {
      console.error('Error updating feedback:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading feedback...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-forest-deep" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Stakeholder Feedback</h1>
                <p className="text-gray-600">Review and manage preview site feedback</p>
              </div>
            </div>
            <button
              onClick={loadFeedback}
              className="flex items-center gap-2 bg-forest-deep text-white px-4 py-2 rounded-md hover:bg-sage-calm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-900">{stats.byStatus.new}</div>
                <div className="text-sm text-blue-700">New</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-900">{stats.byStatus.acknowledged}</div>
                <div className="text-sm text-purple-700">Acknowledged</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-900">{stats.byStatus.inProgress}</div>
                <div className="text-sm text-yellow-700">In Progress</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-900">{stats.byStatus.resolved}</div>
                <div className="text-sm text-green-700">Resolved</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">{stats.byStatus.wontFix}</div>
                <div className="text-sm text-gray-700">Won't Fix</div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="wont-fix">Won't Fix</option>
            </select>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Types</option>
              <option value="bug">Bug</option>
              <option value="suggestion">Suggestion</option>
              <option value="design">Design</option>
              <option value="content">Content</option>
              <option value="other">Other</option>
            </select>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedback.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
              <p className="text-gray-600">Stakeholder feedback will appear here when submitted</p>
            </div>
          ) : (
            feedback.map((item) => {
              const typeInfo = TYPE_ICONS[item.type] || TYPE_ICONS.other
              const TypeIcon = typeInfo.icon

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${typeInfo.bg}`}>
                      <TypeIcon className={`w-6 h-6 ${typeInfo.color}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.page}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${PRIORITY_COLORS[item.priority]}`}>
                              {item.priority}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full ${typeInfo.bg} ${typeInfo.color}`}>
                              {item.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(item.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <select
                          value={item.status}
                          onChange={(e) => updateStatus(item.id, e.target.value)}
                          className={`text-sm px-3 py-1 rounded-md border ${STATUS_COLORS[item.status]}`}
                        >
                          <option value="new">New</option>
                          <option value="acknowledged">Acknowledged</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="wont-fix">Won't Fix</option>
                        </select>
                      </div>

                      <p className="text-gray-700 mb-3">{item.message}</p>

                      {(item.userName || item.userEmail) && (
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">From:</span>{' '}
                          {item.userName && <span>{item.userName}</span>}
                          {item.userEmail && <span className="text-gray-500"> ({item.userEmail})</span>}
                        </div>
                      )}

                      {item.browserInfo && (
                        <details className="text-sm text-gray-600">
                          <summary className="cursor-pointer hover:text-gray-900">Technical Details</summary>
                          <div className="mt-2 bg-gray-50 p-3 rounded-md text-xs font-mono">
                            <div><strong>User Agent:</strong> {item.browserInfo.userAgent || 'N/A'}</div>
                            <div><strong>Viewport:</strong> {item.browserInfo.viewport || 'N/A'}</div>
                            <div><strong>Screen:</strong> {item.browserInfo.screenSize || 'N/A'}</div>
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
