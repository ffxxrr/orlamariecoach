/**
 * Feedback Status Update API
 */

import { NextResponse } from 'next/server'
import { projectStatus } from '@/lib/project-status'
import type { FeedbackItem } from '@/lib/project-status'

export const dynamic = 'force-dynamic'

export async function PATCH(request: Request) {
  try {
    const { feedbackId, status, resolvedAt } = await request.json()

    if (!feedbackId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing feedbackId or status' },
        { status: 400 }
      )
    }

    projectStatus.updateFeedback(feedbackId, {
      status: status as FeedbackItem['status'],
      resolvedAt
    })

    return NextResponse.json({
      success: true,
      message: 'Feedback updated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating feedback:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update feedback',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
