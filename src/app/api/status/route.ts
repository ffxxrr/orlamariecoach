/**
 * Project Status API Endpoint
 * Returns current project status for monitoring
 */

import { NextResponse } from 'next/server'
import { projectStatus } from '@/lib/project-status'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const status = projectStatus.getStatus()

    return NextResponse.json({
      success: true,
      status,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error retrieving project status:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve project status',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const updates = await request.json()

    projectStatus.updateStatus(updates)

    return NextResponse.json({
      success: true,
      status: projectStatus.getStatus(),
      message: 'Project status updated successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating project status:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update project status',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
