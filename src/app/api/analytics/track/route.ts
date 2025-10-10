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
    
    // Check rate limiting (simple implementation)
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Parse request body
    const payload: TrackingPayload = await request.json();
    
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
    const sessionData = {
      sessionId: payload.visitorInfo.sessionId,
      visitorId: payload.visitorInfo.visitorId,
      pageviews: payload.events.filter(e => e.type === 'pageview').length,
      bounced: payload.events.length === 1 && payload.events[0].type === 'pageview',
    };

    if (firstEvent?.data.referrer) {
      const referrerUrl = new URL(firstEvent.data.referrer);
      Object.assign(sessionData, {
        referrer: firstEvent.data.referrer,
        referrerDomain: referrerUrl.hostname,
      });

      // Parse UTM parameters if present
      const urlParams = new URLSearchParams(referrerUrl.search);
      Object.assign(sessionData, {
        utmSource: urlParams.get('utm_source'),
        utmMedium: urlParams.get('utm_medium'),
        utmCampaign: urlParams.get('utm_campaign'),
        utmTerm: urlParams.get('utm_term'),
        utmContent: urlParams.get('utm_content'),
      });
    }

    // Upsert session
    await prisma.analyticsSession.upsert({
      where: { sessionId: payload.visitorInfo.sessionId },
      update: {
        endedAt: new Date(),
        pageviews: { increment: payload.events.filter(e => e.type === 'pageview').length },
        bounced: false, // If we're updating, it's not a bounce
      },
      create: sessionData,
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
 * Get geographic data from IP address (privacy-compliant)
 */
async function getGeographicData(ip: string): Promise<{ country?: string; region?: string; city?: string }> {
  // For privacy, we only collect country/region level data
  // In production, you might use a service like GeoLite2 or ipstack
  
  try {
    // For development, return default values
    if (ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
      return { country: 'Unknown', region: undefined, city: undefined };
    }

    // In production, implement actual geolocation lookup
    // Example with a hypothetical service:
    // const response = await fetch(`https://api.geolocation.service/v1/${ip}`);
    // const data = await response.json();
    // return { country: data.country, region: data.region, city: data.city };

    return { country: 'Ireland', region: 'Leinster', city: undefined }; // Default for development
  } catch (error) {
    console.warn('Geolocation lookup failed:', error);
    return { country: undefined, region: undefined, city: undefined };
  }
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
