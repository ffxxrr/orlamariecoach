import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
const prisma = getPrisma();

export async function GET() {
  try {
    const now = new Date();
    // Active visitors: those with activity in the last 5 minutes
    const activeThreshold = new Date(now.getTime() - 5 * 60 * 1000);
    // Recent activity: last 30 minutes (sessions can be long)
    const recentThreshold = new Date(now.getTime() - 30 * 60 * 1000);
    // For referrers and device stats: last 24 hours
    const dayThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [
      activeVisitorsCount,
      activeSessions,
      recentSessions,
      referrerStats,
      deviceStats,
      countryStats,
    ] = await Promise.all([
      // Count active visitors (activity in last 5 mins)
      prisma.analyticsVisitor.count({
        where: {
          lastSeen: { gte: activeThreshold },
        },
      }),

      // Get sessions for currently active visitors (lastSeen in last 5 mins)
      prisma.analyticsSession.findMany({
        where: {
          visitor: {
            lastSeen: { gte: activeThreshold },
          },
        },
        select: {
          entryPage: true,
          exitPage: true, // exitPage may be more current
          startedAt: true,
          visitor: {
            select: {
              country: true,
              city: true,
              deviceType: true,
            },
          },
        },
        orderBy: {
          startedAt: 'desc',
        },
      }),

      // Recent sessions for activity feed
      prisma.analyticsSession.findMany({
        where: {
          startedAt: { gte: recentThreshold },
        },
        select: {
          entryPage: true,
          exitPage: true,
          startedAt: true,
          visitor: {
            select: {
              country: true,
              city: true,
              deviceType: true,
            },
          },
        },
        orderBy: {
          startedAt: 'desc',
        },
        take: 15,
      }),

      // Top referrers (last 24h)
      prisma.analyticsSession.groupBy({
        by: ['referrerDomain'],
        where: {
          startedAt: { gte: dayThreshold },
          referrerDomain: { not: null },
        },
        _count: {
          referrerDomain: true,
        },
        orderBy: {
          _count: {
            referrerDomain: 'desc',
          },
        },
        take: 5,
      }),

      // Device breakdown (last 24h)
      prisma.analyticsVisitor.groupBy({
        by: ['deviceType'],
        where: {
          lastSeen: { gte: dayThreshold },
        },
        _count: {
          deviceType: true,
        },
      }),

      // Geographic data (last 24h)
      prisma.analyticsVisitor.groupBy({
        by: ['country'],
        where: {
          lastSeen: { gte: dayThreshold },
          country: { not: null },
        },
        _count: {
          country: true,
        },
        orderBy: {
          _count: {
            country: 'desc',
          },
        },
        take: 5,
      }),
    ]);

    // Count direct traffic
    const directTrafficCount = await prisma.analyticsSession.count({
      where: {
        startedAt: { gte: dayThreshold },
        OR: [
          { referrerDomain: null },
          { referrerDomain: '' },
        ],
      },
    });

    // Group active sessions by current page (exitPage if available, else entryPage)
    // For active visitors, get their most recent session's current page
    const visitorPages: Record<string, string> = {};
    activeSessions.forEach(session => {
      // Use exitPage if available (more current), otherwise entryPage
      const page = session.exitPage || session.entryPage || '/';
      // Group by visitor to avoid counting multiple sessions per visitor
      const visitorKey = `${session.visitor?.country}-${session.visitor?.deviceType}`;
      // Keep the most recent page (sessions are sorted by startedAt desc)
      if (!visitorPages[visitorKey]) {
        visitorPages[visitorKey] = page;
      }
    });

    // Now count pages
    const pageGroups: Record<string, number> = {};
    Object.values(visitorPages).forEach(page => {
      pageGroups[page] = (pageGroups[page] || 0) + 1;
    });

    const activePages = Object.entries(pageGroups)
      .map(([page, count]) => ({
        page,
        visitors: count,
        title: getPageTitle(page),
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 10);

    // Format recent activity from sessions (use exitPage if available for current page)
    const recentActivity = recentSessions.map((session, index) => {
      const page = session.exitPage || session.entryPage || '/';
      return {
        id: (index + 1).toString(),
        page,
        timestamp: session.startedAt.toISOString(),
        location: formatLocation(session.visitor?.country, session.visitor?.city),
        deviceType: session.visitor?.deviceType || 'desktop',
        title: getPageTitle(page),
      };
    });

    // Format referrers
    const topReferrers = [
      ...referrerStats.map(r => ({
        domain: r.referrerDomain || 'unknown',
        visitors: r._count.referrerDomain,
      })),
      { domain: 'direct', visitors: directTrafficCount },
    ].sort((a, b) => b.visitors - a.visitors).slice(0, 5);

    // Calculate device breakdown percentages
    const totalDevices = deviceStats.reduce((sum, d) => sum + d._count.deviceType, 0);
    const deviceBreakdown = {
      desktop: Math.round((deviceStats.find(d => d.deviceType === 'desktop')?._count.deviceType || 0) / Math.max(totalDevices, 1) * 100),
      mobile: Math.round((deviceStats.find(d => d.deviceType === 'mobile')?._count.deviceType || 0) / Math.max(totalDevices, 1) * 100),
      tablet: Math.round((deviceStats.find(d => d.deviceType === 'tablet')?._count.deviceType || 0) / Math.max(totalDevices, 1) * 100),
    };

    // Format geographic data
    const geographicData = countryStats.map(c => ({
      country: c.country || 'Unknown',
      visitors: c._count.country,
    }));

    return NextResponse.json({
      activeVisitors: activeVisitorsCount,
      activePages,
      recentPageviews: recentActivity,
      topReferrers,
      deviceBreakdown,
      geographicData,
    });

  } catch (error) {
    console.error('Realtime analytics error:', error);
    return NextResponse.json({
      activeVisitors: 0,
      activePages: [],
      recentPageviews: [],
      topReferrers: [],
      deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
      geographicData: [],
    });
  }
}

function formatLocation(country?: string | null, city?: string | null): string {
  if (city && country) return `${city}, ${country}`;
  if (country) return country;
  return 'Unknown';
}

function getPageTitle(page: string): string {
  const titles: Record<string, string> = {
    '/': 'Homepage',
    '/about': 'About Orla',
    '/services': 'Services',
    '/courses': 'Courses',
    '/book-session': 'Book Session',
    '/contact': 'Contact',
    '/privacy': 'Privacy Policy',
    '/terms': 'Terms of Service',
  };
  return titles[page] || page;
}
