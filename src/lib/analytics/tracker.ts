/**
 * Core Analytics Tracker
 * Privacy-first visitor tracking for Orla Marie Coach website
 */

export interface TrackerConfig {
  apiEndpoint: string;
  privacyMode: boolean;
  enableConsent: boolean;
  sessionTimeout: number; // minutes
  batchSize: number;
  flushInterval: number; // milliseconds
}

export interface TrackingEvent {
  eventType: string;
  page: string;
  referrer?: string;
  eventData?: Record<string, any>;
  timestamp: Date;
  performanceMetrics?: {
    loadTime?: number;
    domContentLoaded?: number;
    firstPaint?: number;
    firstContentfulPaint?: number;
    largestContentfulPaint?: number;
    connectionType?: string;
  };
  scrollDepth?: {
    maxScrollPercent: number;
    timeOnPage: number;
    elementsViewed: string[];
  };
}

class AnalyticsTracker {
  private config: TrackerConfig;
  private visitorId: string;
  private sessionId: string;
  private eventQueue: TrackingEvent[] = [];
  private isOptedOut: boolean = false;
  private flushTimer?: NodeJS.Timeout;

  constructor(config: Partial<TrackerConfig> = {}) {
    this.config = {
      apiEndpoint: '/api/analytics',
      privacyMode: true,
      enableConsent: true,
      sessionTimeout: 30,
      batchSize: 10,
      flushInterval: 5000,
      ...config
    };

    this.visitorId = this.getOrCreateVisitorId();
    this.sessionId = this.getOrCreateSessionId();
    
    // Check opt-out status
    this.checkOptOutStatus();
    
    // Start flush timer
    this.startFlushTimer();
    
    // Handle page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.flush());
      window.addEventListener('pagehide', () => this.flush());
    }
  }

  /**
   * Track a page view
   */
  public trackPageView(additionalData?: Record<string, any>): void {
    if (this.isOptedOut || this.shouldRespectDoNotTrack()) {
      return;
    }

    const event: TrackingEvent = {
      eventType: 'pageview',
      page: this.getCurrentPage(),
      referrer: this.getReferrer(),
      eventData: {
        userAgent: this.getUserAgent(),
        screenSize: this.getScreenSize(),
        timestamp: new Date().toISOString(),
        ...additionalData
      },
      timestamp: new Date()
    };

    this.queueEvent(event);
  }

  /**
   * Track a custom event
   */
  public trackEvent(eventType: string, eventData?: Record<string, any>): void {
    if (this.isOptedOut || this.shouldRespectDoNotTrack()) {
      return;
    }

    const event: TrackingEvent = {
      eventType,
      page: this.getCurrentPage(),
      referrer: this.getReferrer(),
      eventData: {
        timestamp: new Date().toISOString(),
        ...eventData
      },
      timestamp: new Date()
    };

    this.queueEvent(event);
  }

  /**
   * Track course-specific interactions
   */
  public trackCourseInteraction(action: string, courseData: Record<string, any>): void {
    this.trackEvent('course_interaction', {
      action,
      ...courseData
    });
  }

  /**
   * Track booking flow events
   */
  public trackBookingFlow(step: string, bookingData: Record<string, any>): void {
    this.trackEvent('booking_flow', {
      step,
      ...bookingData
    });
  }

  /**
   * Opt out of tracking
   */
  public optOut(): void {
    this.isOptedOut = true;
    localStorage.setItem('analytics_opt_out', 'true');
    this.eventQueue = [];
    this.clearFlushTimer();
  }

  /**
   * Opt back in to tracking
   */
  public optIn(): void {
    this.isOptedOut = false;
    localStorage.removeItem('analytics_opt_out');
    this.startFlushTimer();
  }

  /**
   * Check if user is opted out
   */
  public isUserOptedOut(): boolean {
    return this.isOptedOut;
  }

  /**
   * Set user consent for analytics tracking
   */
  public async setConsent(hasConsented: boolean, consentType: string = 'analytics'): Promise<void> {
    try {
      const response = await fetch(this.config.apiEndpoint + '/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId: this.visitorId,
          hasConsented,
          consentType,
          timestamp: Date.now()
        }),
      });

      if (response.ok) {
        if (hasConsented) {
          this.optIn();
        } else {
          this.optOut();
        }
      }
    } catch (error) {
      console.warn('Failed to set analytics consent:', error);
    }
  }

  /**
   * Check user consent status
   */
  public async checkConsent(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiEndpoint}/consent?visitorId=${this.visitorId}`);
      
      if (response.ok) {
        const data = await response.json();
        return data.hasConsented === true;
      }
    } catch (error) {
      console.warn('Failed to check analytics consent:', error);
    }
    
    return false;
  }

  /**
   * Manually flush the event queue
   */
  public flush(): void {
    if (this.eventQueue.length === 0) {
      return;
    }

    const events = [...this.eventQueue];
    this.eventQueue = [];

    this.sendEvents(events);
  }

  /**
   * Get visitor ID (fingerprint-based)
   */
  private getOrCreateVisitorId(): string {
    const existing = localStorage.getItem('analytics_visitor_id');
    if (existing) {
      return existing;
    }

    // Create fingerprint-based ID
    const fingerprint = this.generateFingerprint();
    localStorage.setItem('analytics_visitor_id', fingerprint);
    return fingerprint;
  }

  /**
   * Get or create session ID
   */
  private getOrCreateSessionId(): string {
    const sessionKey = 'analytics_session_id';
    const timestampKey = 'analytics_session_timestamp';
    
    const existing = sessionStorage.getItem(sessionKey);
    const timestamp = sessionStorage.getItem(timestampKey);
    
    const now = Date.now();
    const sessionTimeoutMs = this.config.sessionTimeout * 60 * 1000;
    
    if (existing && timestamp) {
      const lastActivity = parseInt(timestamp, 10);
      if (now - lastActivity < sessionTimeoutMs) {
        // Update timestamp
        sessionStorage.setItem(timestampKey, now.toString());
        return existing;
      }
    }
    
    // Create new session
    const sessionId = this.generateSessionId();
    sessionStorage.setItem(sessionKey, sessionId);
    sessionStorage.setItem(timestampKey, now.toString());
    return sessionId;
  }

  /**
   * Generate visitor fingerprint
   */
  private generateFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Visitor fingerprint', 2, 2);
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).substring(0, 32);
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Check if user has opted out
   */
  private checkOptOutStatus(): void {
    this.isOptedOut = localStorage.getItem('analytics_opt_out') === 'true';
  }

  /**
   * Check Do Not Track preference
   */
  private shouldRespectDoNotTrack(): boolean {
    if (!this.config.privacyMode) {
      return false;
    }
    
    return navigator.doNotTrack === '1' || 
           (navigator as any).msDoNotTrack === '1' ||
           (window as any).doNotTrack === '1';
  }

  /**
   * Get current page path
   */
  private getCurrentPage(): string {
    return window.location.pathname;
  }

  /**
   * Get referrer
   */
  private getReferrer(): string | undefined {
    return document.referrer || undefined;
  }

  /**
   * Get user agent
   */
  private getUserAgent(): string {
    return navigator.userAgent;
  }

  /**
   * Get screen size
   */
  private getScreenSize(): string {
    return `${screen.width}x${screen.height}`;
  }

  /**
   * Queue event for batch sending
   */
  private queueEvent(event: TrackingEvent): void {
    this.eventQueue.push(event);
    
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  /**
   * Send events to server
   */
  private async sendEvents(events: TrackingEvent[]): Promise<void> {
    try {
      // Prepare visitor information for new schema
      const visitorInfo = {
        visitorId: this.visitorId,
        sessionId: this.sessionId,
        userAgent: this.getUserAgent(),
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenSize: this.getScreenSize(),
        deviceType: this.getDeviceType(),
        isReturning: this.isReturningVisitor()
      };

      const payload = {
        visitorInfo,
        events: events.map(event => {
          if (event.eventType === 'pageview') {
            return {
              type: 'pageview',
              data: {
                page: event.page,
                title: document.title,
                referrer: event.referrer,
                timestamp: event.timestamp.getTime()
              }
            };
          } else {
            return {
              type: 'event',
              data: {
                eventType: event.eventType,
                page: event.page,
                eventName: event.eventData?.eventName,
                element: event.eventData?.element,
                value: event.eventData?.value,
                metadata: event.eventData,
                timestamp: event.timestamp.getTime()
              }
            };
          }
        })
      };

      const response = await fetch(this.config.apiEndpoint + '/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn('Analytics tracking failed:', response.statusText);
      }
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }

  /**
   * Determine device type based on screen width
   */
  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Check if this is a returning visitor
   */
  private isReturningVisitor(): boolean {
    const hasVisited = localStorage.getItem('analytics_has_visited');
    if (!hasVisited) {
      localStorage.setItem('analytics_has_visited', 'true');
      return false;
    }
    return true;
  }

  /**
   * Start flush timer
   */
  private startFlushTimer(): void {
    this.clearFlushTimer();
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  /**
   * Clear flush timer
   */
  private clearFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = undefined;
    }
  }

  /**
   * Collect performance metrics
   */
  private getPerformanceMetrics(): TrackingEvent['performanceMetrics'] {
    if (typeof window === 'undefined' || !window.performance) {
      return undefined;
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    let firstPaint: number | undefined;
    let firstContentfulPaint: number | undefined;
    
    paint.forEach(entry => {
      if (entry.name === 'first-paint') {
        firstPaint = entry.startTime;
      } else if (entry.name === 'first-contentful-paint') {
        firstContentfulPaint = entry.startTime;
      }
    });

    // Get LCP if available
    let largestContentfulPaint: number | undefined;
    try {
      const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
      if (lcpEntries.length > 0) {
        largestContentfulPaint = lcpEntries[lcpEntries.length - 1].startTime;
      }
    } catch (e) {
      // LCP not supported
    }

    // Get connection info if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const connectionType = connection?.effectiveType || 'unknown';

    return {
      loadTime: navigation ? Math.round(navigation.loadEventEnd - navigation.fetchStart) : undefined,
      domContentLoaded: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart) : undefined,
      firstPaint: firstPaint ? Math.round(firstPaint) : undefined,
      firstContentfulPaint: firstContentfulPaint ? Math.round(firstContentfulPaint) : undefined,
      largestContentfulPaint: largestContentfulPaint ? Math.round(largestContentfulPaint) : undefined,
      connectionType
    };
  }

  /**
   * Initialize scroll depth tracking
   */
  private initScrollTracking(): { getScrollData: () => TrackingEvent['scrollDepth'] } {
    let maxScrollPercent = 0;
    let startTime = Date.now();
    let elementsViewed: string[] = [];
    
    const checkScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const scrollPercent = Math.round((scrollTop + windowHeight) / documentHeight * 100);
      maxScrollPercent = Math.max(maxScrollPercent, scrollPercent);
      
      // Track viewed elements with data-track-view attribute
      const viewportElements = document.querySelectorAll('[data-track-view]');
      viewportElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < windowHeight && rect.bottom > 0;
        const trackId = el.getAttribute('data-track-view');
        
        if (isVisible && trackId && !elementsViewed.includes(trackId)) {
          elementsViewed.push(trackId);
        }
      });
    };

    // Add scroll listener with throttling
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScrollDepth, 100);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return {
      getScrollData: () => ({
        maxScrollPercent,
        timeOnPage: Math.round((Date.now() - startTime) / 1000),
        elementsViewed: [...elementsViewed]
      })
    };
  }

  /**
   * Enhanced page view tracking with performance metrics
   */
  public trackPageViewWithMetrics(additionalData?: Record<string, any>): void {
    if (this.isOptedOut || this.shouldRespectDoNotTrack()) {
      return;
    }

    // Wait for page load to get accurate metrics
    if (document.readyState === 'loading') {
      window.addEventListener('load', () => {
        setTimeout(() => this.trackPageViewWithMetrics(additionalData), 100);
      });
      return;
    }

    const performanceMetrics = this.getPerformanceMetrics();
    const scrollTracker = this.initScrollTracking();

    const event: TrackingEvent = {
      eventType: 'pageview_enhanced',
      page: this.getCurrentPage(),
      referrer: this.getReferrer(),
      timestamp: new Date(),
      performanceMetrics,
      eventData: {
        ...additionalData,
        title: document.title,
        url: window.location.href
      }
    };

    this.queueEvent(event);

    // Track scroll depth on page unload
    const trackScrollOnUnload = () => {
      const scrollData = scrollTracker.getScrollData();
      const scrollEvent: TrackingEvent = {
        eventType: 'scroll_depth',
        page: this.getCurrentPage(),
        timestamp: new Date(),
        scrollDepth: scrollData,
        eventData: {
          page: this.getCurrentPage(),
          ...scrollData
        }
      };
      
      // Send immediately on unload
      this.sendEvents([scrollEvent]);
    };

    window.addEventListener('beforeunload', trackScrollOnUnload);
    window.addEventListener('pagehide', trackScrollOnUnload);
  }
}

export default AnalyticsTracker;