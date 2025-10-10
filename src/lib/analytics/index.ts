/**
 * OrlaMarieCoach Analytics Library
 * Privacy-first analytics tracking system
 */

import AnalyticsTracker from './tracker';
import VisitorManager from './visitor';
import EventTracker from './events';
import PrivacyManager from './privacy';
import SessionManager from './session';
import ErrorTracker from './error-tracking';
// import DataRetentionManager from './data-retention'; // TODO: Update for new schema

export type { 
  TrackerConfig,
  TrackingEvent 
} from './tracker';

export type {
  VisitorInfo,
  DeviceInfo,
  LocationInfo
} from './visitor';

export type {
  AnalyticsEvent,
  PageViewEvent,
  CourseEvent,
  BookingEvent,
  AudioEvent,
  ContactEvent,
  NavigationEvent,
  ConversionEvent
} from './events';

export type {
  ConsentSettings,
  PrivacyConfig,
  DataSubjectRights
} from './privacy';

/**
 * Main Analytics Class
 * Combines all analytics functionality into a single interface
 */
class Analytics {
  private tracker: AnalyticsTracker;
  private privacyManager: PrivacyManager;
  private sessionManager?: SessionManager;
  private errorTracker?: ErrorTracker;
  private eventTracker?: EventTracker;
  private visitorInfo?: any;

  constructor(config: Partial<any> = {}) {
    // Initialize privacy manager first
    this.privacyManager = new PrivacyManager(config.privacy);
    
    // Initialize tracker with privacy controls
    this.tracker = new AnalyticsTracker({
      apiEndpoint: config.apiEndpoint || '/api/analytics',
      privacyMode: true,
      enableConsent: true,
      ...config.tracker
    });

    // Initialize components if tracking is allowed
    if (this.privacyManager.isTrackingAllowed()) {
      this.initializeTracking();
    }

    // Show consent banner if needed
    if (typeof window !== 'undefined') {
      this.privacyManager.showConsentBanner();
    }

    // Listen for consent changes
    if (typeof window !== 'undefined') {
      window.addEventListener('analyticsConsentChange', (event: any) => {
        if (event.detail.analytics) {
          this.initializeTracking();
        } else {
          this.disableTracking();
        }
      });

      window.addEventListener('analyticsOptOut', () => {
        this.disableTracking();
      });
    }
  }

  /**
   * Initialize tracking components
   */
  private initializeTracking(): void {
    if (typeof window === 'undefined') return;

    this.visitorInfo = VisitorManager.getVisitorInfo();
    this.sessionManager = new SessionManager();
    this.errorTracker = new ErrorTracker(this);
    this.eventTracker = new EventTracker(
      this.visitorInfo.id,
      this.visitorInfo.sessionId
    );

    // Auto-track enhanced page view on initialization
    this.trackPageViewWithMetrics();
  }

  /**
   * Disable all tracking
   */
  private disableTracking(): void {
    this.eventTracker = undefined;
    this.sessionManager = undefined;
    this.errorTracker = undefined;
    this.visitorInfo = undefined;
  }

  /**
   * Track page view
   */
  public trackPageView(additionalData?: any): void {
    if (!this.isTrackingEnabled()) return;

    this.tracker.trackPageView(additionalData);
  }

  /**
   * Track page view with performance metrics and scroll depth
   */
  public trackPageViewWithMetrics(additionalData?: any): void {
    if (!this.isTrackingEnabled()) return;

    this.tracker.trackPageViewWithMetrics(additionalData);
  }

  /**
   * Track custom event
   */
  public trackEvent(eventType: string, eventData?: any): void {
    if (!this.isTrackingEnabled()) return;

    this.tracker.trackEvent(eventType, eventData);
  }

  /**
   * Track course interaction
   */
  public trackCourseInteraction(action: string, courseData?: any): void {
    if (!this.isTrackingEnabled()) return;

    this.tracker.trackCourseInteraction(action, courseData);
  }

  /**
   * Track booking flow
   */
  public trackBookingFlow(step: string, bookingData?: any): void {
    if (!this.isTrackingEnabled()) return;

    this.tracker.trackBookingFlow(step, bookingData);
  }

  /**
   * Track audio interaction
   */
  public trackAudioInteraction(action: 'play' | 'pause' | 'complete' | 'download_request', audioFile: string, audioData?: any): void {
    if (!this.isTrackingEnabled() || !this.eventTracker) return;

    const event = this.eventTracker.createAudioEvent(action, audioFile, audioData);
    this.tracker.trackEvent(event.eventType, event);
  }

  /**
   * Track contact interaction
   */
  public trackContactInteraction(action: 'form_viewed' | 'form_started' | 'form_submitted' | 'email_clicked' | 'phone_clicked', contactData?: any): void {
    if (!this.isTrackingEnabled() || !this.eventTracker) return;

    const event = this.eventTracker.createContactEvent(action, contactData);
    this.tracker.trackEvent(event.eventType, event);
  }

  /**
   * Track navigation event
   */
  public trackNavigation(action: 'menu_opened' | 'menu_closed' | 'link_clicked' | 'cta_clicked', target: string, location?: string): void {
    if (!this.isTrackingEnabled() || !this.eventTracker) return;

    const event = this.eventTracker.createNavigationEvent(action, target, location);
    this.tracker.trackEvent(event.eventType, event);
  }

  /**
   * Track conversion
   */
  public trackConversion(goal: 'newsletter_signup' | 'course_enquiry' | 'booking_request' | 'audio_download', conversionData?: any): void {
    if (!this.isTrackingEnabled() || !this.eventTracker) return;

    const event = this.eventTracker.createConversionEvent(goal, conversionData);
    this.tracker.trackEvent(event.eventType, event);
  }

  /**
   * Get visitor information
   */
  public getVisitorInfo(): any {
    return this.visitorInfo || null;
  }

  /**
   * Get device information
   */
  public getDeviceInfo(): any {
    if (typeof window === 'undefined') return null;
    return VisitorManager.getDeviceInfo();
  }

  /**
   * Privacy controls
   */
  public grantConsent(): void {
    this.privacyManager.grantConsent();
  }

  public denyConsent(): void {
    this.privacyManager.denyConsent();
  }

  public optOut(): void {
    this.privacyManager.optOut();
    this.tracker.optOut();
  }

  public optIn(): void {
    this.privacyManager.optIn();
    this.tracker.optIn();
  }

  public isOptedOut(): boolean {
    return this.tracker.isUserOptedOut();
  }

  public getConsentSettings(): any {
    return this.privacyManager.getConsentSettings();
  }

  public exportUserData(): any {
    return this.privacyManager.exportUserData();
  }

  /**
   * Check if tracking is currently enabled
   */
  public isTrackingEnabled(): boolean {
    return this.privacyManager.isTrackingAllowed() && 
           !this.tracker.isUserOptedOut();
  }

  /**
   * Get session metrics
   */
  public getSessionMetrics(): any {
    return this.sessionManager?.getSessionMetrics() || null;
  }

  /**
   * Get session data
   */
  public getSessionData(): any {
    return this.sessionManager?.getSessionData() || null;
  }

  /**
   * Track user interaction (for session engagement)
   */
  public trackInteraction(): void {
    this.sessionManager?.trackInteraction();
  }

  /**
   * Update scroll depth (for session engagement)
   */
  public updateScrollDepth(scrollPercent: number): void {
    this.sessionManager?.updateScrollDepth(scrollPercent);
  }

  /**
   * Get error statistics
   */
  public getErrorStats(): any {
    return this.errorTracker?.getErrorStats() || null;
  }

  /**
   * Get recent errors
   */
  public getErrors(): any[] {
    return this.errorTracker?.getErrors() || [];
  }

  /**
   * Get performance issues
   */
  public getPerformanceIssues(): any[] {
    return this.errorTracker?.getPerformanceIssues() || [];
  }

  /**
   * Manually flush error reports
   */
  public flushErrors(): void {
    this.errorTracker?.flushErrors();
  }

  /**
   * Manually flush performance reports
   */
  public flushPerformance(): void {
    this.errorTracker?.flushPerformance();
  }

  /**
   * Manually flush tracking queue
   */
  public flush(): void {
    this.tracker.flush();
  }
}

// Export main class and utilities
export {
  Analytics,
  AnalyticsTracker,
  VisitorManager,
  EventTracker,
  PrivacyManager,
  SessionManager,
  ErrorTracker,
  // DataRetentionManager // TODO: Update for new schema
};

// Default export
export default Analytics;