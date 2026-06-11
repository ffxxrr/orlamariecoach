import { NextRequest, NextResponse } from 'next/server'
import { getPrisma } from '@/lib/db'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session'

/** Mutating feedback (resolve/edit/delete) is admin-only. */
async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const { id } = await params
    const body = await request.json()
    const { status, adminNotes } = body

    const prisma = getPrisma()
    const feedback = await prisma.feedback.update({
      where: { id },
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
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdmin(request)
  if (unauthorized) return unauthorized

  try {
    const { id } = await params
    const prisma = getPrisma()
    await prisma.feedback.delete({
      where: { id },
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
