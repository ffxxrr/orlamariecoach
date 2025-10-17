/**
 * Project Status Report Generation API
 */

import { NextResponse } from 'next/server'
import { projectStatus } from '@/lib/project-status'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const report = projectStatus.generateStatusReport()

    return new NextResponse(report, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': `attachment; filename="project-status-${new Date().toISOString().split('T')[0]}.md"`,
      },
    })
  } catch (error) {
    console.error('Error generating report:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate report',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
