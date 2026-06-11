'use client';

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Analytics from '@/lib/analytics';
import ConsentBanner from './ConsentBanner';

interface AnalyticsContextType {
  analytics: Analytics | null;
  isTrackingEnabled: boolean;
  hasConsent: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  analytics: null,
  isTrackingEnabled: false,
  hasConsent: false,
});

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const pathname = usePathname();
  // The initial pageview is tracked on analytics init; skip it here to avoid a double-count.
  const initialPathTracked = useRef(false);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') return;

    // Initialize analytics instance
    const analyticsInstance = new Analytics({
      apiEndpoint: '/api/analytics',
      privacy: {
        respectDoNotTrack: true,
        requireExplicitConsent: true,
        showPrivacyNotice: false, // We'll handle this with our React component
      }
    });

    setAnalytics(analyticsInstance);

    // Check initial consent status
    const consentSettings = analyticsInstance.getConsentSettings();
    const initialHasConsent = consentSettings?.analytics === true;
    const initialIsTracking = analyticsInstance.isTrackingEnabled();
    
    setHasConsent(initialHasConsent);
    setIsTrackingEnabled(initialIsTracking);
    
    // Show consent banner if no consent has been given
    if (!consentSettings) {
      setShowConsentBanner(true);
    }

    // Listen for consent changes
    const handleConsentChange = () => {
      const newHasConsent = analyticsInstance.isTrackingEnabled();
      setHasConsent(newHasConsent);
      setIsTrackingEnabled(newHasConsent);
      setShowConsentBanner(false);
    };

    window.addEventListener('analyticsConsentChange', handleConsentChange);
    window.addEventListener('analyticsOptOut', handleConsentChange);

    return () => {
      window.removeEventListener('analyticsConsentChange', handleConsentChange);
      window.removeEventListener('analyticsOptOut', handleConsentChange);
    };
  }, []);

  // Track client-side (SPA) navigations. Next.js route changes don't reload the
  // page, so without this only hard loads would ever record a pageview.
  useEffect(() => {
    if (!analytics || !isTrackingEnabled) return;
    if (!initialPathTracked.current) {
      // First render: analytics init already tracked this pageview.
      initialPathTracked.current = true;
      return;
    }
    analytics.trackPageView();
  }, [pathname, analytics, isTrackingEnabled]);

  const handleConsentChange = (consent: boolean) => {
    setHasConsent(consent);
    setIsTrackingEnabled(consent);
    setShowConsentBanner(false);
  };

  return (
    <AnalyticsContext.Provider value={{ analytics, isTrackingEnabled, hasConsent }}>
      {children}
      {showConsentBanner && typeof window !== 'undefined' && (
        <ConsentBanner onConsentChange={handleConsentChange} />
      )}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context && typeof window !== 'undefined') {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context || { analytics: null, isTrackingEnabled: false, hasConsent: false };
}

export function useEventTracker() {
  const { analytics, isTrackingEnabled } = useAnalytics();
  
  return {
    trackEvent: (eventType: string, eventData?: any) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackEvent(eventType, eventData);
      }
    },
    trackPageView: (additionalData?: any) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackPageView(additionalData);
      }
    },
    trackCourseInteraction: (action: string, courseData?: any) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackCourseInteraction(action, courseData);
      }
    },
    trackBookingFlow: (step: string, bookingData?: any) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackBookingFlow(step, bookingData);
      }
    },
    trackAudioInteraction: (action: any, audioFile: string, audioData?: any) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackAudioInteraction(action, audioFile, audioData);
      }
    },
    trackContactInteraction: (action: any, contactData?: any) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackContactInteraction(action, contactData);
      }
    },
    trackNavigation: (action: any, target: string, location?: string) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackNavigation(action, target, location);
      }
    },
    trackConversion: (goal: any, conversionData?: any) => {
      if (analytics && isTrackingEnabled) {
        analytics.trackConversion(goal, conversionData);
      }
    },
  };
}