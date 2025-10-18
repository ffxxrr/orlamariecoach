import { NextResponse } from 'next/server'
import { getPrisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const prisma = getPrisma()
  const started = Date.now()
  try {
    const nowRows = await prisma.$queryRawUnsafe<Array<{ now: Date }>>('SELECT NOW() as now')
    const verRows = await prisma.$queryRawUnsafe<Array<{ version: string }>>('SELECT version() as version')

    const durationMs = Date.now() - started
    return NextResponse.json({
      ok: true,
      db: {
        connected: true,
        now: nowRows?.[0]?.now ?? null,
        version: verRows?.[0]?.version ?? null,
      },
      durationMs,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({
      ok: false,
      error: message,
      timestamp: new Date().toISOString(),
    }, { status: 500 })
  }
}

