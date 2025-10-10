import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
export const dynamic = 'force-dynamic';
const prisma = getPrisma();

export async function GET(request: NextRequest) {
  try {
    // Get time range from query params
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '7d';
    
    // Calculate date range
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get previous period for comparison
    const periodLength = now.getTime() - startDate.getTime();
    const previousStartDate = new Date(startDate.getTime() - periodLength);
    const previousEndDate = startDate;

    // Parallel queries for better performance
    const [
      currentVisitors,
      previousVisitors,
      currentPageviews,
      previousPageviews,
      currentSessions,
      previousSessions,
      topPages,
      deviceStats,
      recentActivity
    ] = await Promise.all([
      // Current period visitors
      prisma.analyticsVisitor.count({
        where: {
          firstSeen: {
            gte: startDate,
            lte: now
          }
        }
      }),
      
      // Previous period visitors
      prisma.analyticsVisitor.count({
        where: {
          firstSeen: {
            gte: previousStartDate,
            lte: previousEndDate
          }
        }
      }),
      
      // Current period pageviews
      prisma.analyticsPageview.count({
        where: {
          timestamp: {
            gte: startDate,
            lte: now
          }
        }
      }),
      
      // Previous period pageviews
      prisma.analyticsPageview.count({
        where: {
          timestamp: {
            gte: previousStartDate,
            lte: previousEndDate
          }
        }
      }),
      
      // Current period sessions
      prisma.analyticsSession.findMany({
        where: {
          startedAt: {
            gte: startDate,
            lte: now
          }
        },
        select: {
          bounced: true,
          endedAt: true,
          startedAt: true
        }
      }),
      
      // Previous period sessions
      prisma.analyticsSession.findMany({
        where: {
          startedAt: {
            gte: previousStartDate,
            lte: previousEndDate
          }
        },
        select: {
          bounced: true,
          endedAt: true,
          startedAt: true
        }
      }),
      
      // Top pages
      prisma.analyticsPageview.groupBy({
        by: ['page'],
        where: {
          timestamp: {
            gte: startDate,
            lte: now
          }
        },
        _count: {
          page: true
        },
        orderBy: {
          _count: {
            page: 'desc'
          }
        },
        take: 5
      }),
      
      // Device statistics
      prisma.analyticsVisitor.groupBy({
        by: ['deviceType'],
        where: {
          lastSeen: {
            gte: startDate,
            lte: now
          }
        },
        _count: {
          deviceType: true
        }
      }),
      
      // Recent activity
      prisma.analyticsPageview.findMany({
        where: {
          timestamp: {
            gte: new Date(now.getTime() - 60 * 60 * 1000) // Last hour
          }
        },
        include: {
          visitor: {
            select: {
              country: true,
              city: true
            }
          }
        },
        orderBy: {
          timestamp: 'desc'
        },
        take: 10
      })
    ]);

    // Calculate metrics
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const todayVisitors = await prisma.analyticsVisitor.count({
      where: {
        firstSeen: {
          gte: todayStart,
          lte: now
        }
      }
    });
    
    const todayPageviews = await prisma.analyticsPageview.count({
      where: {
        timestamp: {
          gte: todayStart,
          lte: now
        }
      }
    });

    // Calculate session duration and bounce rate
    const avgSessionDuration = currentSessions.length > 0 
      ? currentSessions
          .filter(s => s.endedAt)
          .reduce((sum, session) => {
            const duration = session.endedAt!.getTime() - session.startedAt.getTime();
            return sum + duration;
          }, 0) / currentSessions.filter(s => s.endedAt).length / 1000 // Convert to seconds
      : 0;

    const currentBounceRate = currentSessions.length > 0
      ? (currentSessions.filter(s => s.bounced).length / currentSessions.length) * 100
      : 0;
    
    const previousBounceRate = previousSessions.length > 0
      ? (previousSessions.filter(s => s.bounced).length / previousSessions.length) * 100
      : 0;

    // Calculate percentage changes
    const visitorChange = previousVisitors > 0 
      ? ((currentVisitors - previousVisitors) / previousVisitors) * 100 
      : 0;
    
    const pageviewChange = previousPageviews > 0 
      ? ((currentPageviews - previousPageviews) / previousPageviews) * 100 
      : 0;
      
    const bounceRateChange = previousBounceRate > 0
      ? ((currentBounceRate - previousBounceRate) / previousBounceRate) * 100
      : 0;

    // Get top pages with change calculation
    const topPagesWithChange = await Promise.all(
      topPages.map(async (page) => {
        const previousCount = await prisma.analyticsPageview.count({
          where: {
            page: page.page,
            timestamp: {
              gte: previousStartDate,
              lte: previousEndDate
            }
          }
        });
        
        const change = previousCount > 0 
          ? ((page._count.page - previousCount) / previousCount) * 100 
          : 0;
          
        return {
          page: page.page,
          views: page._count.page,
          change: Math.round(change * 10) / 10
        };
      })
    );

    // Calculate device percentages
    const totalDeviceCount = deviceStats.reduce((sum, device) => sum + device._count.deviceType, 0);
    const devices = {
      desktop: Math.round((deviceStats.find(d => d.deviceType === 'desktop')?._count.deviceType || 0) / Math.max(totalDeviceCount, 1) * 100),
      mobile: Math.round((deviceStats.find(d => d.deviceType === 'mobile')?._count.deviceType || 0) / Math.max(totalDeviceCount, 1) * 100),
      tablet: Math.round((deviceStats.find(d => d.deviceType === 'tablet')?._count.deviceType || 0) / Math.max(totalDeviceCount, 1) * 100)
    };

    // Format recent activity
    const formattedRecentActivity = recentActivity.map((activity, index) => ({
      id: (index + 1).toString(),
      type: 'pageview' as const,
      page: activity.page,
      timestamp: getRelativeTime(activity.timestamp),
      location: formatLocation(activity.visitor?.country, activity.visitor?.city)
    }));

    // Return analytics data
    const analyticsData = {
      visitors: {
        total: currentVisitors,
        today: todayVisitors,
        change: Math.round(visitorChange * 10) / 10
      },
      pageviews: {
        total: currentPageviews,
        today: todayPageviews,
        change: Math.round(pageviewChange * 10) / 10
      },
      sessions: {
        average: Math.round(avgSessionDuration),
        bounceRate: Math.round(currentBounceRate * 10) / 10,
        change: Math.round(bounceRateChange * 10) / 10
      },
      topPages: topPagesWithChange,
      devices,
      recentActivity: formattedRecentActivity
    };

    return NextResponse.json(analyticsData);
    
  } catch (error) {
    console.error('Analytics data fetch error:', error);
    
    // Return fallback data on error
    return NextResponse.json({
      visitors: { total: 0, today: 0, change: 0 },
      pageviews: { total: 0, today: 0, change: 0 },
      sessions: { average: 0, bounceRate: 0, change: 0 },
      topPages: [],
      devices: { desktop: 0, mobile: 0, tablet: 0 },
      recentActivity: []
    });
  }
}

/**
 * Get relative time string
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 minute ago';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

/**
 * Format location string
 */
function formatLocation(country?: string | null, city?: string | null): string {
  if (city && country) {
    return `${city}, ${country}`;
  }
  if (country) {
    return country;
  }
  return 'Unknown';
}
