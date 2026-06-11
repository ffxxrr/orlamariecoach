/**
 * Analytics Tracking API Endpoint
 * Handles batch event tracking with privacy controls
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
export const dynamic = 'force-dynamic';
const prisma = getPrisma();

export interface VisitorInfo {
  visitorId: string;
  sessionId: string;
  userAgent: string;
  language: string;
  timezone: string;
  screenSize: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  isReturning: boolean;
}

export interface TrackingPayload {
  visitorInfo: VisitorInfo;
  events: Array<{
    type: 'pageview' | 'event';
    data: {
      page: string;
      title?: string;
      referrer?: string;
      timestamp: number;
      eventType?: string;
      eventName?: string;
      element?: string;
      value?: number;
      metadata?: any;
    };
  }>;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting headers
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';

    // Drop bot/crawler traffic so it doesn't inflate visitor metrics.
    // Acknowledge with 200 so the client doesn't retry, but store nothing.
    if (isBot(request.headers.get('user-agent'))) {
      return NextResponse.json({ success: true, ignored: 'bot' });
    }

    // Check rate limiting (simple implementation)
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Parse request body
    const payload: TrackingPayload = await request.json();

    if (isBot(payload?.visitorInfo?.userAgent)) {
      return NextResponse.json({ success: true, ignored: 'bot' });
    }
    
    // Validate payload
    const validation = validateTrackingPayload(payload);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid payload', details: validation.errors },
        { status: 400 }
      );
    }

    // Get geographic data from IP (privacy-compliant)
    const geoData = await getGeographicData(ip);

    // Ensure visitor exists or create new one
    await prisma.analyticsVisitor.upsert({
      where: { visitorId: payload.visitorInfo.visitorId },
      update: {
        lastSeen: new Date(),
        userAgent: sanitizeUserAgent(payload.visitorInfo.userAgent),
        language: payload.visitorInfo.language,
        timezone: payload.visitorInfo.timezone,
        screenSize: payload.visitorInfo.screenSize,
        deviceType: payload.visitorInfo.deviceType,
        country: geoData.country,
        region: geoData.region,
        city: geoData.city,
      },
      create: {
        visitorId: payload.visitorInfo.visitorId,
        userAgent: sanitizeUserAgent(payload.visitorInfo.userAgent),
        language: payload.visitorInfo.language,
        timezone: payload.visitorInfo.timezone,
        screenSize: payload.visitorInfo.screenSize,
        deviceType: payload.visitorInfo.deviceType,
        isReturning: payload.visitorInfo.isReturning,
        country: geoData.country,
        region: geoData.region,
        city: geoData.city,
      },
    });

    // Process session data
    const firstEvent = payload.events[0];
    const pageviewEvents = payload.events.filter(e => e.type === 'pageview');
    const firstPageview = pageviewEvents[0];
    const lastPageview = pageviewEvents[pageviewEvents.length - 1];

    // Parse referrer data
    let referrer: string | undefined;
    let referrerDomain: string | undefined;
    let utmSource: string | null = null;
    let utmMedium: string | null = null;
    let utmCampaign: string | null = null;
    let utmTerm: string | null = null;
    let utmContent: string | null = null;

    if (firstEvent?.data.referrer) {
      try {
        const referrerUrl = new URL(firstEvent.data.referrer);
        referrer = firstEvent.data.referrer;
        referrerDomain = referrerUrl.hostname;
        const urlParams = new URLSearchParams(referrerUrl.search);
        utmSource = urlParams.get('utm_source');
        utmMedium = urlParams.get('utm_medium');
        utmCampaign = urlParams.get('utm_campaign');
        utmTerm = urlParams.get('utm_term');
        utmContent = urlParams.get('utm_content');
      } catch {
        // Invalid referrer URL, skip
      }
    }

    // Look up the existing session so we can compute duration (endedAt - startedAt)
    // and an accurate bounce flag. duration was previously never written, which
    // left every "Avg Duration" on the dashboard at 0s.
    const now = new Date();
    const existingSession = await prisma.analyticsSession.findUnique({
      where: { sessionId: payload.visitorInfo.sessionId },
      select: { startedAt: true, pageviews: true },
    });

    const totalPageviews = (existingSession?.pageviews ?? 0) + pageviewEvents.length;
    const sessionDuration = existingSession
      ? Math.max(0, Math.round((now.getTime() - existingSession.startedAt.getTime()) / 1000))
      : undefined;

    // Upsert session
    await prisma.analyticsSession.upsert({
      where: { sessionId: payload.visitorInfo.sessionId },
      update: {
        endedAt: now,
        duration: sessionDuration,
        pageviews: { increment: pageviewEvents.length },
        // Only clear the bounce flag once the session has more than one pageview.
        // (The unload scroll_depth event used to mark every session non-bounced.)
        ...(totalPageviews > 1 ? { bounced: false } : {}),
        ...(lastPageview ? { exitPage: lastPageview.data.page } : {}),
      },
      create: {
        sessionId: payload.visitorInfo.sessionId,
        visitorId: payload.visitorInfo.visitorId,
        pageviews: pageviewEvents.length,
        bounced: pageviewEvents.length <= 1,
        entryPage: firstPageview?.data.page,
        exitPage: lastPageview?.data.page,
        referrer,
        referrerDomain,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
      },
    });

    // Process individual events
    const pageviewPromises = payload.events
      .filter(event => event.type === 'pageview')
      .map(event => 
        prisma.analyticsPageview.create({
          data: {
            visitorId: payload.visitorInfo.visitorId,
            sessionId: payload.visitorInfo.sessionId,
            page: event.data.page,
            title: event.data.title,
            timestamp: new Date(event.data.timestamp),
          },
        })
      );

    const eventPromises = payload.events
      .filter(event => event.type === 'event')
      .map(event =>
        prisma.analyticsEvent.create({
          data: {
            visitorId: payload.visitorInfo.visitorId,
            sessionId: payload.visitorInfo.sessionId,
            eventType: event.data.eventType!,
            eventName: event.data.eventName,
            page: event.data.page,
            element: event.data.element,
            value: event.data.value,
            metadata: event.data.metadata,
            timestamp: new Date(event.data.timestamp),
          },
        })
      );

    // Execute all database operations
    await Promise.all([...pageviewPromises, ...eventPromises]);

    return NextResponse.json({
      success: true,
      processed: payload.events.length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Analytics tracking error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Validate tracking payload
 */
function validateTrackingPayload(payload: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate visitor info
  if (!payload.visitorInfo) {
    errors.push('Missing visitorInfo');
  } else {
    if (!payload.visitorInfo.visitorId || typeof payload.visitorInfo.visitorId !== 'string') {
      errors.push('Missing or invalid visitorInfo.visitorId');
    }

    if (!payload.visitorInfo.sessionId || typeof payload.visitorInfo.sessionId !== 'string') {
      errors.push('Missing or invalid visitorInfo.sessionId');
    }

    if (!payload.visitorInfo.userAgent || typeof payload.visitorInfo.userAgent !== 'string') {
      errors.push('Missing or invalid visitorInfo.userAgent');
    }

    if (!['mobile', 'tablet', 'desktop'].includes(payload.visitorInfo.deviceType)) {
      errors.push('Invalid visitorInfo.deviceType');
    }
  }

  if (!Array.isArray(payload.events)) {
    errors.push('Events must be an array');
  } else {
    // Validate individual events
    payload.events.forEach((event: any, index: number) => {
      if (!['pageview', 'event'].includes(event.type)) {
        errors.push(`Event ${index}: Invalid type (must be 'pageview' or 'event')`);
      }

      if (!event.data || typeof event.data !== 'object') {
        errors.push(`Event ${index}: Missing or invalid data object`);
      } else {
        if (!event.data.page || typeof event.data.page !== 'string') {
          errors.push(`Event ${index}: Missing or invalid data.page`);
        }

        if (!event.data.timestamp || typeof event.data.timestamp !== 'number') {
          errors.push(`Event ${index}: Missing or invalid data.timestamp`);
        }

        // Validate event-specific fields
        if (event.type === 'event' && (!event.data.eventType || typeof event.data.eventType !== 'string')) {
          errors.push(`Event ${index}: Missing or invalid data.eventType for event type`);
        }
      }
    });

    // Check batch size limits
    if (payload.events.length > 50) {
      errors.push('Too many events in batch (max 50)');
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if date string is valid
 */
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

/**
 * Simple rate limiting implementation
 */
async function isRateLimited(ip: string): Promise<boolean> {
  // In production, use Redis or similar for distributed rate limiting
  // For now, simple in-memory rate limiting
  const rateLimitStore = (global as any).rateLimitStore || new Map();
  (global as any).rateLimitStore = rateLimitStore;

  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 100; // Max requests per window

  const clientData = rateLimitStore.get(ip) || { count: 0, resetTime: now + windowMs };

  if (now > clientData.resetTime) {
    // Reset window
    clientData.count = 1;
    clientData.resetTime = now + windowMs;
  } else {
    clientData.count++;
  }

  rateLimitStore.set(ip, clientData);

  // Clean up old entries
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  return clientData.count > maxRequests;
}

/**
 * Get geographic data from IP address (privacy-compliant).
 *
 * No GeoIP provider is configured, so we return no location rather than
 * fabricating one — the previous implementation hardcoded "Ireland/Leinster"
 * for every visitor, which made the dashboard's location data fiction.
 *
 * To enable real geolocation, plug a provider in here (e.g. MaxMind GeoLite2
 * locally, or a Cloudflare `cf-ipcountry` header) and return its values.
 */
async function getGeographicData(_ip: string): Promise<{ country?: string; region?: string; city?: string }> {
  return { country: undefined, region: undefined, city: undefined };
}

/**
 * Detect bot/crawler user agents so automated traffic doesn't pollute metrics.
 */
function isBot(userAgent: string | null | undefined): boolean {
  if (!userAgent) return true; // no UA at all is almost always automated
  return /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|outbrain|pinterest|vkshare|w3c_validator|headless|lighthouse|gtmetrix|pingdom|uptime|monitor|curl|wget|python-requests|axios|go-http|java\/|okhttp|phantomjs|puppeteer|playwright/i.test(
    userAgent
  );
}

/**
 * Sanitize user agent string to remove sensitive information
 */
function sanitizeUserAgent(userAgent: string): string {
  // Remove or hash any potentially identifying information
  // For now, just truncate if too long
  if (userAgent.length > 500) {
    return userAgent.substring(0, 500);
  }
  return userAgent;
}

// Cleanup database connections
export async function GET() {
  return NextResponse.json({ 
    message: 'Analytics tracking endpoint',
    methods: ['POST'],
    version: '1.0'
  });
}
