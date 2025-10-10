/**
 * Event Tracking Utilities
 * Specialized tracking for OrlaMarieCoach website interactions
 */

export interface BaseEvent {
  eventType: string;
  timestamp: Date;
  page: string;
  sessionId: string;
  visitorId: string;
}

export interface PageViewEvent extends BaseEvent {
  eventType: 'pageview';
  title: string;
  referrer?: string;
  loadTime?: number;
  scrollDepth?: number;
}

export interface CourseEvent extends BaseEvent {
  eventType: 'course_interaction';
  action: 'view' | 'enquiry' | 'download_sample' | 'click_cta';
  courseId?: string;
  courseName?: string;
  coursePrice?: number;
  source?: string;
}

export interface BookingEvent extends BaseEvent {
  eventType: 'booking_flow';
  step: 'started' | 'form_viewed' | 'form_submitted' | 'completed' | 'abandoned';
  sessionType?: string;
  preferredTime?: string;
  formData?: Record<string, any>;
}

export interface AudioEvent extends BaseEvent {
  eventType: 'audio_interaction';
  action: 'play' | 'pause' | 'complete' | 'download_request';
  audioFile: string;
  duration?: number;
  position?: number;
  email?: string; // For gated downloads
}

export interface ContactEvent extends BaseEvent {
  eventType: 'contact_interaction';
  action: 'form_viewed' | 'form_started' | 'form_submitted' | 'email_clicked' | 'phone_clicked';
  formField?: string;
  contactMethod?: string;
}

export interface NavigationEvent extends BaseEvent {
  eventType: 'navigation';
  action: 'menu_opened' | 'menu_closed' | 'link_clicked' | 'cta_clicked';
  target: string;
  location: string;
}

export interface ConversionEvent extends BaseEvent {
  eventType: 'conversion';
  goal: 'newsletter_signup' | 'course_enquiry' | 'booking_request' | 'audio_download';
  value?: number;
  currency?: string;
  metadata?: Record<string, any>;
}

export type AnalyticsEvent = 
  | PageViewEvent 
  | CourseEvent 
  | BookingEvent 
  | AudioEvent 
  | ContactEvent 
  | NavigationEvent 
  | ConversionEvent;

class EventTracker {
  private visitorId: string;
  private sessionId: string;
  private startTime: number;
  private scrollDepth: number = 0;
  private pageViews: Set<string> = new Set();

  constructor(visitorId: string, sessionId: string) {
    this.visitorId = visitorId;
    this.sessionId = sessionId;
    this.startTime = Date.now();
    
    if (typeof window !== 'undefined') {
      this.setupScrollTracking();
      this.setupPerformanceTracking();
    }
  }

  /**
   * Create page view event
   */
  public createPageViewEvent(additionalData?: Partial<PageViewEvent>): PageViewEvent {
    const page = window.location.pathname;
    const isNewPage = !this.pageViews.has(page);
    this.pageViews.add(page);

    return {
      eventType: 'pageview',
      timestamp: new Date(),
      page,
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      title: document.title,
      referrer: document.referrer || undefined,
      loadTime: isNewPage ? this.getPageLoadTime() : undefined,
      scrollDepth: this.scrollDepth,
      ...additionalData
    };
  }

  /**
   * Create course interaction event
   */
  public createCourseEvent(
    action: CourseEvent['action'],
    courseData?: Partial<CourseEvent>
  ): CourseEvent {
    return {
      eventType: 'course_interaction',
      timestamp: new Date(),
      page: window.location.pathname,
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      action,
      ...courseData
    };
  }

  /**
   * Create booking flow event
   */
  public createBookingEvent(
    step: BookingEvent['step'],
    bookingData?: Partial<BookingEvent>
  ): BookingEvent {
    return {
      eventType: 'booking_flow',
      timestamp: new Date(),
      page: window.location.pathname,
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      step,
      ...bookingData
    };
  }

  /**
   * Create audio interaction event
   */
  public createAudioEvent(
    action: AudioEvent['action'],
    audioFile: string,
    audioData?: Partial<AudioEvent>
  ): AudioEvent {
    return {
      eventType: 'audio_interaction',
      timestamp: new Date(),
      page: window.location.pathname,
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      action,
      audioFile,
      ...audioData
    };
  }

  /**
   * Create contact interaction event
   */
  public createContactEvent(
    action: ContactEvent['action'],
    contactData?: Partial<ContactEvent>
  ): ContactEvent {
    return {
      eventType: 'contact_interaction',
      timestamp: new Date(),
      page: window.location.pathname,
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      action,
      ...contactData
    };
  }

  /**
   * Create navigation event
   */
  public createNavigationEvent(
    action: NavigationEvent['action'],
    target: string,
    location?: string
  ): NavigationEvent {
    return {
      eventType: 'navigation',
      timestamp: new Date(),
      page: window.location.pathname,
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      action,
      target,
      location: location || window.location.pathname
    };
  }

  /**
   * Create conversion event
   */
  public createConversionEvent(
    goal: ConversionEvent['goal'],
    conversionData?: Partial<ConversionEvent>
  ): ConversionEvent {
    return {
      eventType: 'conversion',
      timestamp: new Date(),
      page: window.location.pathname,
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      goal,
      ...conversionData
    };
  }

  /**
   * Track scroll depth
   */
  private setupScrollTracking(): void {
    let maxScroll = 0;
    
    const updateScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        this.scrollDepth = Math.min(maxScroll, 100);
      }
    };

    // Throttled scroll handler
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateScrollDepth, 150);
    }, { passive: true });

    // Track scroll milestones
    const milestones = [25, 50, 75, 100];
    let trackedMilestones = new Set<number>();

    const checkMilestones = () => {
      milestones.forEach(milestone => {
        if (this.scrollDepth >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          // Could emit scroll milestone event here if needed
        }
      });
    };

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        updateScrollDepth();
        checkMilestones();
      }, 150);
    }, { passive: true });
  }

  /**
   * Setup performance tracking
   */
  private setupPerformanceTracking(): void {
    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = this.getPageLoadTime();
      if (loadTime && loadTime > 0) {
        // Page load time could be included in page view events
        this.startTime = Date.now() - loadTime;
      }
    });
  }

  /**
   * Get page load time
   */
  private getPageLoadTime(): number | undefined {
    if ('performance' in window && 'timing' in window.performance) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      return loadTime > 0 ? loadTime : undefined;
    }
    return undefined;
  }

  /**
   * Get time spent on page
   */
  public getTimeOnPage(): number {
    return Date.now() - this.startTime;
  }

  /**
   * Get current scroll depth
   */
  public getCurrentScrollDepth(): number {
    return this.scrollDepth;
  }
}

/**
 * Utility functions for common event patterns
 */
export class EventUtils {
  /**
   * Extract course information from URL or page
   */
  public static extractCourseInfo(): { courseId?: string; courseName?: string } {
    const path = window.location.pathname;
    
    if (path.includes('/courses')) {
      // Extract from URL or page content
      const courseElements = document.querySelectorAll('[data-course-id]');
      if (courseElements.length > 0) {
        const firstCourse = courseElements[0] as HTMLElement;
        return {
          courseId: firstCourse.dataset.courseId,
          courseName: firstCourse.dataset.courseName
        };
      }
    }
    
    return {};
  }

  /**
   * Extract form data safely
   */
  public static extractFormData(form: HTMLFormElement): Record<string, any> {
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    
    for (const [key, value] of Array.from(formData.entries())) {
      // Only include non-sensitive data
      if (!this.isSensitiveField(key)) {
        data[key] = value;
      }
    }
    
    return data;
  }

  /**
   * Check if field contains sensitive data
   */
  private static isSensitiveField(fieldName: string): boolean {
    const sensitiveFields = [
      'password', 'email', 'phone', 'name', 'address', 
      'credit_card', 'ssn', 'personal'
    ];
    
    return sensitiveFields.some(field => 
      fieldName.toLowerCase().includes(field)
    );
  }

  /**
   * Get element hierarchy for better event context
   */
  public static getElementHierarchy(element: HTMLElement): string {
    const hierarchy: string[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.id) {
        selector += `#${current.id}`;
      } else if (current.className) {
        const classes = current.className.split(' ').filter(c => c.length > 0);
        if (classes.length > 0) {
          selector += `.${classes.slice(0, 2).join('.')}`;
        }
      }
      
      hierarchy.unshift(selector);
      current = current.parentElement;
    }
    
    return hierarchy.join(' > ');
  }
}

export default EventTracker;