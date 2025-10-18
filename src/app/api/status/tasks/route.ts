/**
 * Task Status Update API
 */

import { NextResponse } from 'next/server'
import { projectStatus } from '@/lib/project-status'
import type { TaskItem } from '@/lib/project-status'

export const dynamic = 'force-dynamic'

export async function PATCH(request: Request) {
  try {
    const { taskId, status } = await request.json()

    if (!taskId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing taskId or status' },
        { status: 400 }
      )
    }

    projectStatus.updateTask(taskId, { status: status as TaskItem['status'] })

    return NextResponse.json({
      success: true,
      message: 'Task updated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating task:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update task',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
