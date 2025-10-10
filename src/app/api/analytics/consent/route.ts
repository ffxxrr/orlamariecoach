/**
 * Analytics Consent Management API Endpoint
 * Handles GDPR consent preferences and data subject rights
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/db';
export const dynamic = 'force-dynamic';
const prisma = getPrisma();

export interface ConsentPayload {
  visitorId: string;
  hasConsented: boolean;
  consentType: string;
  timestamp: number;
}

export interface DataDeletionRequest {
  visitorId: string;
  requestType: 'delete' | 'export' | 'anonymize';
  email?: string; // For verification
}

/**
 * Update consent preferences
 */
export async function POST(request: NextRequest) {
  try {
    const payload: ConsentPayload = await request.json();
    
    // Validate payload
    if (!validateConsentPayload(payload)) {
      return NextResponse.json(
        { error: 'Invalid consent payload' },
        { status: 400 }
      );
    }

    // Get IP for anonymized storage (GDPR compliance)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0] || request.headers.get('x-real-ip') || 'unknown';
    const anonymizedIp = anonymizeIp(ip);

    // Store consent in dedicated consent table
    await prisma.analyticsConsent.upsert({
      where: { visitorId: payload.visitorId },
      update: {
        hasConsented: payload.hasConsented,
        consentType: payload.consentType,
        consentDate: new Date(payload.timestamp),
        ipAddress: anonymizedIp,
        userAgent: request.headers.get('user-agent') || undefined,
      },
      create: {
        visitorId: payload.visitorId,
        hasConsented: payload.hasConsented,
        consentType: payload.consentType,
        consentDate: new Date(payload.timestamp),
        ipAddress: anonymizedIp,
        userAgent: request.headers.get('user-agent') || undefined,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Consent preferences updated',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Consent update error:', error);
    return NextResponse.json(
      { error: 'Failed to update consent' },
      { status: 500 }
    );
  }
}

/**
 * Get consent preferences
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const visitorId = searchParams.get('visitorId');

    if (!visitorId) {
      return NextResponse.json(
        { error: 'Missing visitorId parameter' },
        { status: 400 }
      );
    }

    // Get consent record
    const consent = await prisma.analyticsConsent.findUnique({
      where: { visitorId }
    });

    if (!consent) {
      return NextResponse.json({
        hasConsented: false,
        message: 'No consent record found'
      });
    }
    
    return NextResponse.json({
      hasConsented: consent.hasConsented,
      consentType: consent.consentType,
      consentDate: consent.consentDate,
    });

  } catch (error) {
    console.error('Consent retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve consent' },
      { status: 500 }
    );
  }
}

/**
 * Handle data subject rights requests (GDPR Article 15-22)
 */
export async function DELETE(request: NextRequest) {
  try {
    const payload: DataDeletionRequest = await request.json();
    
    if (!payload.visitorId) {
      return NextResponse.json(
        { error: 'Missing visitorId' },
        { status: 400 }
      );
    }

    switch (payload.requestType) {
      case 'delete':
        return await handleDataDeletion(payload.visitorId);
      
      case 'export':
        return await handleDataExport(payload.visitorId);
      
      case 'anonymize':
        return await handleDataAnonymization(payload.visitorId);
      
      default:
        return NextResponse.json(
          { error: 'Invalid request type' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Data subject rights error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

/**
 * Validate consent payload
 */
function validateConsentPayload(payload: any): boolean {
  return !!(
    payload.visitorId &&
    typeof payload.hasConsented === 'boolean' &&
    payload.consentType &&
    typeof payload.timestamp === 'number'
  );
}

/**
 * Anonymize IP address for GDPR compliance
 */
function anonymizeIp(ip: string): string {
  if (ip === 'unknown') return ip;
  
  const parts = ip.split('.');
  if (parts.length === 4) {
    // IPv4: zero out last octet
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  
  // IPv6: zero out last 64 bits
  const ipv6Parts = ip.split(':');
  if (ipv6Parts.length >= 4) {
    return ipv6Parts.slice(0, 4).join(':') + '::';
  }
  
  return ip;
}

/**
 * Handle complete data deletion (Right to be forgotten)
 */
async function handleDataDeletion(visitorId: string) {
  // Delete all related data in transaction
  const result = await prisma.$transaction(async (tx) => {
    const [pageviews, events, sessions, visitor, consent] = await Promise.all([
      tx.analyticsPageview.deleteMany({ where: { visitorId } }),
      tx.analyticsEvent.deleteMany({ where: { visitorId } }),
      tx.analyticsSession.deleteMany({ where: { visitorId } }),
      tx.analyticsVisitor.deleteMany({ where: { visitorId } }),
      tx.analyticsConsent.deleteMany({ where: { visitorId } }),
    ]);

    return {
      pageviews: pageviews.count,
      events: events.count,
      sessions: sessions.count,
      visitor: visitor.count,
      consent: consent.count,
    };
  });

  return NextResponse.json({
    success: true,
    message: 'All data deleted successfully',
    deletedRecords: result,
    timestamp: new Date().toISOString()
  });
}

/**
 * Handle data export (Right to data portability)
 */
async function handleDataExport(visitorId: string) {
  // Get all related data
  const [visitor, sessions, pageviews, events, consent] = await Promise.all([
    prisma.analyticsVisitor.findUnique({ where: { visitorId } }),
    prisma.analyticsSession.findMany({ where: { visitorId }, orderBy: { startedAt: 'desc' } }),
    prisma.analyticsPageview.findMany({ where: { visitorId }, orderBy: { timestamp: 'desc' } }),
    prisma.analyticsEvent.findMany({ where: { visitorId }, orderBy: { timestamp: 'desc' } }),
    prisma.analyticsConsent.findUnique({ where: { visitorId } }),
  ]);

  // Format data for export
  const exportData = {
    visitorId,
    dataCreated: new Date().toISOString(),
    visitor: visitor ? {
      firstSeen: visitor.firstSeen,
      lastSeen: visitor.lastSeen,
      isReturning: visitor.isReturning,
      deviceType: visitor.deviceType,
      language: visitor.language,
      timezone: visitor.timezone,
      country: visitor.country,
      region: visitor.region,
    } : null,
    consent: consent ? {
      hasConsented: consent.hasConsented,
      consentType: consent.consentType,
      consentDate: consent.consentDate,
    } : null,
    sessions: sessions.map(session => ({
      sessionId: session.sessionId,
      startedAt: session.startedAt,
      endedAt: session.endedAt,
      duration: session.duration,
      pageviews: session.pageviews,
      bounced: session.bounced,
      referrer: session.referrer,
      utmSource: session.utmSource,
      utmMedium: session.utmMedium,
      utmCampaign: session.utmCampaign,
    })),
    pageviews: pageviews.map(pv => ({
      page: pv.page,
      title: pv.title,
      duration: pv.duration,
      scrollDepth: pv.scrollDepth,
      timestamp: pv.timestamp,
    })),
    events: events.map(event => ({
      eventType: event.eventType,
      eventName: event.eventName,
      page: event.page,
      element: event.element,
      value: event.value,
      metadata: event.metadata,
      timestamp: event.timestamp,
    })),
    summary: {
      totalSessions: sessions.length,
      totalPageviews: pageviews.length,
      totalEvents: events.length,
    },
    retention: {
      policyDays: 365,
      description: 'Data is automatically deleted after 365 days'
    },
    rights: {
      access: 'You can request your data at any time',
      rectification: 'You can request corrections to your data',
      erasure: 'You can request deletion of your data',
      portability: 'You can export your data (this request)',
      objection: 'You can opt out of data collection',
      restriction: 'You can restrict processing'
    }
  };

  return NextResponse.json(exportData);
}

/**
 * Handle data anonymization
 */
async function handleDataAnonymization(visitorId: string) {
  // Replace visitorId with anonymized version
  const anonymizedId = 'anon_' + Date.now() + '_' + Math.random().toString(36).substring(2);
  
  // Anonymize data in transaction
  const result = await prisma.$transaction(async (tx) => {
    const [pageviews, events, sessions, visitor] = await Promise.all([
      tx.analyticsPageview.updateMany({
        where: { visitorId },
        data: { visitorId: anonymizedId }
      }),
      tx.analyticsEvent.updateMany({
        where: { visitorId },
        data: { visitorId: anonymizedId }
      }),
      tx.analyticsSession.updateMany({
        where: { visitorId },
        data: { visitorId: anonymizedId }
      }),
      tx.analyticsVisitor.updateMany({
        where: { visitorId },
        data: {
          visitorId: anonymizedId,
          userAgent: null,
          country: null,
          region: null,
          city: null,
          timezone: null,
          language: null,
        }
      }),
    ]);

    // Delete consent record since it's no longer valid
    await tx.analyticsConsent.deleteMany({ where: { visitorId } });

    return {
      pageviews: pageviews.count,
      events: events.count,
      sessions: sessions.count,
      visitor: visitor.count,
    };
  });

  return NextResponse.json({
    success: true,
    message: 'Data anonymized successfully',
    updatedRecords: result,
    anonymizedId: anonymizedId,
    timestamp: new Date().toISOString()
  });
}
