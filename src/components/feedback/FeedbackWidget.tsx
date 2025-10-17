'use client'

import React, { useState } from 'react'
import { X, MessageCircle, Camera, Send } from 'lucide-react'

interface FeedbackForm {
  page: string
  element?: string
  type: 'bug' | 'enhancement' | 'design' | 'content' | 'general'
  priority: 'critical' | 'high' | 'medium' | 'low'
  description: string
  suggestedFix?: string
  email?: string
}

interface FeedbackWidgetProps {
  currentPage: string
  isPreviewMode?: boolean
}

export default function FeedbackWidget({ currentPage, isPreviewMode = false }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FeedbackForm>({
    page: currentPage,
    type: 'general',
    priority: 'medium',
    description: '',
    email: ''
  })

  // Only show in preview mode or development
  if (!isPreviewMode && process.env.NODE_ENV === 'production') {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          createdAt: new Date().toISOString(),
          userAgent: navigator.userAgent,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          url: window.location.href
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setIsOpen(false)
          setSubmitted(false)
          setForm({
            page: currentPage,
            type: 'general',
            priority: 'medium',
            description: '',
            email: ''
          })
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const captureScreenshot = () => {
    // Simple screenshot capture using html2canvas (would need to install)
    alert('Screenshot feature coming soon! For now, please describe the element you\'re referring to.')
  }

  if (submitted) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span>Feedback submitted! Thank you Orla.</span>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Preview Mode Banner */}
      {isPreviewMode && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 z-50">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">PREVIEW MODE - Share your feedback below</span>
          </div>
        </div>
      )}

      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-forest-deep text-white p-3 rounded-full shadow-lg hover:bg-sage-calm transition-colors z-40"
        title="Share Feedback"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Share Your Feedback</h3>
                  <p className="text-sm text-gray-600">Page: {currentPage}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value as FeedbackForm['type'] })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest-deep"
                    >
                      <option value="general">General</option>
                      <option value="design">Design</option>
                      <option value="content">Content</option>
                      <option value="bug">Bug</option>
                      <option value="enhancement">Enhancement</option>
                    </select>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={form.priority}
                      onChange={(e) => setForm({ ...form, priority: e.target.value as FeedbackForm['priority'] })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest-deep"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                {/* Element (optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specific Element (optional)
                  </label>
                  <input
                    type="text"
                    value={form.element || ''}
                    onChange={(e) => setForm({ ...form, element: e.target.value })}
                    placeholder="e.g., Header navigation, hero image, pricing table"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest-deep"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe what you like, don't like, or would like to change..."
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest-deep"
                  />
                </div>

                {/* Suggested Fix */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Suggested Solution (optional)
                  </label>
                  <textarea
                    value={form.suggestedFix || ''}
                    onChange={(e) => setForm({ ...form, suggestedFix: e.target.value })}
                    placeholder="If you have ideas for how to improve this..."
                    rows={2}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest-deep"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={form.email || ''}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="For follow-up questions"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-forest-deep"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={captureScreenshot}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <Camera className="w-4 h-4" />
                    Screenshot
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !form.description.trim()}
                      className="flex items-center gap-2 bg-forest-deep text-white px-4 py-2 rounded-md hover:bg-sage-calm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? 'Sending...' : 'Send Feedback'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}