import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
const prisma = getPrisma();

export async function GET() {
  try {
    const now = new Date();
    // Active visitors: those with activity in the last 5 minutes
    const activeThreshold = new Date(now.getTime() - 5 * 60 * 1000);
    // Recent activity: last 10 minutes
    const recentThreshold = new Date(now.getTime() - 10 * 60 * 1000);
    // For referrers and device stats: last 24 hours
    const dayThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [
      activeVisitorsCount,
      activePageviews,
      recentPageviews,
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

      // Active pages (pageviews in last 5 mins grouped by page)
      prisma.analyticsPageview.groupBy({
        by: ['page', 'title'],
        where: {
          timestamp: { gte: activeThreshold },
        },
        _count: {
          page: true,
        },
        orderBy: {
          _count: {
            page: 'desc',
          },
        },
        take: 10,
      }),

      // Recent pageviews for activity feed
      prisma.analyticsPageview.findMany({
        where: {
          timestamp: { gte: recentThreshold },
        },
        include: {
          visitor: {
            select: {
              country: true,
              city: true,
              deviceType: true,
            },
          },
        },
        orderBy: {
          timestamp: 'desc',
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

    // Format active pages
    const activePages = activePageviews.map(page => ({
      page: page.page,
      visitors: page._count.page,
      title: page.title || getPageTitle(page.page),
    }));

    // Format recent activity
    const recentActivity = recentPageviews.map((pv, index) => ({
      id: (index + 1).toString(),
      page: pv.page,
      timestamp: pv.timestamp.toISOString(),
      location: formatLocation(pv.visitor?.country, pv.visitor?.city),
      deviceType: pv.visitor?.deviceType || 'desktop',
      title: pv.title || getPageTitle(pv.page),
    }));

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
