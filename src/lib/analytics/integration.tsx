/**
 * Analytics Integration for React Components
 * Easy-to-use React hooks and components for analytics tracking
 */

'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import Analytics from './index';

// Create analytics context
const AnalyticsContext = createContext<Analytics | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
  config?: any;
}

/**
 * Analytics Provider Component
 * Wrap your app with this to enable analytics tracking
 */
export function AnalyticsProvider({ children, config = {} }: AnalyticsProviderProps) {
  const analytics = React.useMemo(() => {
    // Only initialize analytics on the client side
    if (typeof window === 'undefined') {
      return null;
    }
    return new Analytics(config);
  }, [config]);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook to access analytics instance
 */
export function useAnalytics() {
  const analytics = useContext(AnalyticsContext);
  if (!analytics && typeof window !== 'undefined') {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return analytics;
}

/**
 * Hook for page view tracking
 */
export function usePageView(additionalData?: any) {
  const analytics = useAnalytics();
  
  useEffect(() => {
    if (analytics && typeof window !== 'undefined') {
      analytics.trackPageView(additionalData);
    }
  }, [analytics, additionalData]);
}

/**
 * Hook for event tracking
 */
export function useEventTracker() {
  const analytics = useAnalytics();
  
  return {
    trackEvent: (eventType: string, eventData?: any) => {
      if (analytics) analytics.trackEvent(eventType, eventData);
    },
    trackCourseInteraction: (action: any, courseData?: any) => {
      if (analytics) analytics.trackCourseInteraction(action, courseData);
    },
    trackBookingFlow: (step: any, bookingData?: any) => {
      if (analytics) analytics.trackBookingFlow(step, bookingData);
    },
    trackAudioInteraction: (action: any, audioFile: string, audioData?: any) => {
      if (analytics) analytics.trackAudioInteraction(action, audioFile, audioData);
    },
    trackContactInteraction: (action: any, contactData?: any) => {
      if (analytics) analytics.trackContactInteraction(action, contactData);
    },
    trackNavigation: (action: any, target: string, location?: string) => {
      if (analytics) analytics.trackNavigation(action, target, location);
    },
    trackConversion: (goal: any, conversionData?: any) => {
      if (analytics) analytics.trackConversion(goal, conversionData);
    },
  };
}

/**
 * Higher-order component for automatic page view tracking
 */
export function withPageTracking<P extends object>(
  Component: React.ComponentType<P>,
  pageData?: any
) {
  return function TrackedComponent(props: P) {
    usePageView(pageData);
    return <Component {...props} />;
  };
}

/**
 * Component for tracking specific interactions
 */
interface TrackingWrapperProps {
  children: ReactNode;
  event: {
    type: 'click' | 'view' | 'hover';
    category: string;
    action: string;
    data?: any;
  };
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function TrackingWrapper({ 
  children, 
  event, 
  as: Component = 'div',
  className,
  ...props 
}: TrackingWrapperProps) {
  const analytics = useAnalytics();
  
  const handleInteraction = () => {
    if (analytics) {
      analytics.trackEvent(`${event.category}_${event.action}`, {
        category: event.category,
        action: event.action,
        ...event.data
      });
    }
  };

  const handlers = {
    ...(event.type === 'click' && { onClick: handleInteraction }),
    ...(event.type === 'hover' && { onMouseEnter: handleInteraction }),
  };

  useEffect(() => {
    if (event.type === 'view') {
      handleInteraction();
    }
  }, []);

  return React.createElement(
    Component,
    {
      className,
      ...handlers,
      ...props
    },
    children
  );
}

/**
 * Course interaction tracking component
 */
interface CourseTrackerProps {
  children: ReactNode;
  courseId: string;
  courseName: string;
  action: 'view' | 'enquiry' | 'download_sample' | 'click_cta';
  trigger?: 'click' | 'view' | 'hover';
}

export function CourseTracker({ 
  children, 
  courseId, 
  courseName, 
  action, 
  trigger = 'click' 
}: CourseTrackerProps) {
  const analytics = useAnalytics();
  
  const handleTracking = () => {
    if (analytics && typeof window !== 'undefined') {
      analytics.trackCourseInteraction(action, {
        courseId,
        courseName,
        source: window.location.pathname
      });
    }
  };

  const handlers = {
    ...(trigger === 'click' && { onClick: handleTracking }),
    ...(trigger === 'hover' && { onMouseEnter: handleTracking }),
  };

  useEffect(() => {
    if (trigger === 'view') {
      handleTracking();
    }
  }, []);

  return <div {...handlers}>{children}</div>;
}

/**
 * Booking flow tracking component
 */
interface BookingTrackerProps {
  children: ReactNode;
  step: 'started' | 'form_viewed' | 'form_submitted' | 'completed' | 'abandoned';
  bookingData?: any;
  trigger?: 'click' | 'view' | 'hover';
}

export function BookingTracker({ 
  children, 
  step, 
  bookingData = {}, 
  trigger = 'click' 
}: BookingTrackerProps) {
  const analytics = useAnalytics();
  
  const handleTracking = () => {
    if (analytics) {
      analytics.trackBookingFlow(step, bookingData);
    }
  };

  const handlers = {
    ...(trigger === 'click' && { onClick: handleTracking }),
    ...(trigger === 'hover' && { onMouseEnter: handleTracking }),
  };

  useEffect(() => {
    if (trigger === 'view') {
      handleTracking();
    }
  }, []);

  return <div {...handlers}>{children}</div>;
}

/**
 * Audio player tracking component
 */
interface AudioTrackerProps {
  children: ReactNode;
  audioFile: string;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
}

export function AudioTracker({ 
  children, 
  audioFile, 
  onPlay, 
  onPause, 
  onComplete 
}: AudioTrackerProps) {
  const analytics = useAnalytics();
  
  const handlePlay = () => {
    if (analytics) analytics.trackAudioInteraction('play', audioFile);
    onPlay?.();
  };

  const handlePause = () => {
    if (analytics) analytics.trackAudioInteraction('pause', audioFile);
    onPause?.();
  };

  const handleComplete = () => {
    if (analytics) analytics.trackAudioInteraction('complete', audioFile);
    onComplete?.();
  };

  return React.cloneElement(children as React.ReactElement, {
    onPlay: handlePlay,
    onPause: handlePause,
    onEnded: handleComplete,
  });
}

/**
 * Privacy controls component
 */
export function PrivacyControls() {
  const analytics = useAnalytics();
  
  const handleOptOut = () => {
    if (analytics) {
      analytics.optOut();
      alert('You have opted out of analytics tracking.');
    }
  };

  const handleOptIn = () => {
    if (analytics) {
      analytics.optIn();
      alert('You have opted back into analytics tracking.');
    }
  };

  const handleExportData = () => {
    if (analytics) {
      const data = analytics.exportUserData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-analytics-data.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="privacy-controls p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-3">Privacy Controls</h3>
      <div className="space-y-2">
        <button 
          onClick={handleOptOut}
          className="block w-full text-left px-3 py-2 bg-red-100 hover:bg-red-200 rounded"
        >
          Opt Out of Analytics
        </button>
        <button 
          onClick={handleOptIn}
          className="block w-full text-left px-3 py-2 bg-green-100 hover:bg-green-200 rounded"
        >
          Opt Back In
        </button>
        <button 
          onClick={handleExportData}
          className="block w-full text-left px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded"
        >
          Export My Data
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-3">
        Status: {analytics?.isOptedOut() ? 'Opted Out' : 'Tracking Enabled'}
      </p>
    </div>
  );
}