import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, adminNotes } = body

    const prisma = getPrisma()
    const feedback = await prisma.feedback.update({
      where: { id: params.id },
      data: {
        status,
        adminNotes: adminNotes || undefined,
        resolvedAt: status === 'resolved' ? new Date() : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      feedback
    })
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update feedback'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prisma = getPrisma()
    await prisma.feedback.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      success: true,
      message: 'Feedback deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting feedback:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete feedback'
      },
      { status: 500 }
    )
  }
}
