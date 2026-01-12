import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
const prisma = getPrisma();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const filter = searchParams.get('filter') || 'all'; // all, new, returning
    const sortBy = searchParams.get('sortBy') || 'lastSeen'; // lastSeen, firstSeen, pageviews
    const search = searchParams.get('search') || '';

    // Build where clause
    const whereClause: Record<string, unknown> = {};

    if (filter === 'new') {
      whereClause.isReturning = false;
    } else if (filter === 'returning') {
      whereClause.isReturning = true;
    }

    if (search) {
      whereClause.OR = [
        { country: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { browserName: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy clause
    let orderBy: Record<string, string> = {};
    switch (sortBy) {
      case 'firstSeen':
        orderBy = { firstSeen: 'desc' };
        break;
      case 'lastSeen':
      default:
        orderBy = { lastSeen: 'desc' };
        break;
    }

    // Parallel queries
    const [visitors, totalCount, newCount, returningCount, allVisitors] = await Promise.all([
      // Paginated visitors with sessions count
      prisma.analyticsVisitor.findMany({
        where: whereClause,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          sessions: {
            select: {
              id: true,
              duration: true,
            },
          },
          pageviews: {
            select: {
              id: true,
            },
          },
        },
      }),

      // Total count with filters
      prisma.analyticsVisitor.count({ where: whereClause }),

      // New visitors count
      prisma.analyticsVisitor.count({ where: { isReturning: false } }),

      // Returning visitors count
      prisma.analyticsVisitor.count({ where: { isReturning: true } }),

      // All visitors for avg session calculation
      prisma.analyticsVisitor.findMany({
        include: {
          sessions: {
            select: {
              duration: true,
            },
          },
        },
      }),
    ]);

    // Calculate average session duration
    let totalDuration = 0;
    let sessionCount = 0;
    allVisitors.forEach(visitor => {
      visitor.sessions.forEach(session => {
        if (session.duration) {
          totalDuration += session.duration;
          sessionCount++;
        }
      });
    });
    const avgSessionDuration = sessionCount > 0 ? totalDuration / sessionCount : 0;

    // Format visitor data
    const formattedVisitors = visitors.map(visitor => {
      const totalDuration = visitor.sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

      return {
        id: visitor.id,
        visitorId: visitor.visitorId,
        firstSeen: visitor.firstSeen.toISOString(),
        lastSeen: visitor.lastSeen.toISOString(),
        pageviews: visitor.pageviews.length,
        sessions: visitor.sessions.length,
        deviceType: visitor.deviceType || 'desktop',
        browser: visitor.browserName || 'Unknown',
        country: visitor.country || 'Unknown',
        city: visitor.city || undefined,
        isReturning: visitor.isReturning,
        totalDuration,
      };
    });

    return NextResponse.json({
      visitors: formattedVisitors,
      totalCount,
      newVisitors: newCount,
      returningVisitors: returningCount,
      avgSessionDuration,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });

  } catch (error) {
    console.error('Visitors API error:', error);
    return NextResponse.json({
      visitors: [],
      totalCount: 0,
      newVisitors: 0,
      returningVisitors: 0,
      avgSessionDuration: 0,
      pagination: { page: 1, limit: 20, totalPages: 0 },
    });
  }
}
