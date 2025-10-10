/**
 * Session Analytics Manager
 * Tracks user sessions, page sequences, and engagement metrics
 */

export interface SessionData {
  sessionId: string;
  startTime: number;
  lastActivity: number;
  pageSequence: PageVisit[];
  totalPageViews: number;
  totalTimeOnSite: number;
  isBounce: boolean;
  entryPage: string;
  exitPage?: string;
  referrer?: string;
  utmParams?: UTMParameters;
}

export interface PageVisit {
  page: string;
  title: string;
  timestamp: number;
  timeOnPage?: number;
  scrollDepth?: number;
  interactions: number;
}

export interface UTMParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

class SessionManager {
  private sessionData: SessionData | null = null;
  private sessionStorageKey = 'analytics_session_data';
  private lastPageChangeTime = Date.now();
  private pageInteractions = 0;

  constructor() {
    this.initSession();
    this.setupPageChangeTracking();
    this.setupInteractionTracking();
  }

  /**
   * Initialize or restore session
   */
  private initSession(): void {
    if (typeof window === 'undefined') return;

    const existingSession = sessionStorage.getItem(this.sessionStorageKey);
    
    if (existingSession) {
      try {
        this.sessionData = JSON.parse(existingSession);
        if (this.sessionData) {
          this.sessionData.lastActivity = Date.now();
          this.updateCurrentPageVisit();
        }
      } catch (error) {
        console.warn('Failed to restore session data:', error);
        this.createNewSession();
      }
    } else {
      this.createNewSession();
    }
  }

  /**
   * Create new session
   */
  private createNewSession(): void {
    if (typeof window === 'undefined') return;

    const sessionId = this.generateSessionId();
    const now = Date.now();
    const utmParams = this.extractUTMParameters();

    this.sessionData = {
      sessionId,
      startTime: now,
      lastActivity: now,
      pageSequence: [],
      totalPageViews: 0,
      totalTimeOnSite: 0,
      isBounce: true,
      entryPage: window.location.pathname,
      referrer: document.referrer || undefined,
      utmParams
    };

    this.addPageVisit();
    this.saveSession();
  }

  /**
   * Add current page to visit sequence
   */
  private addPageVisit(): void {
    if (!this.sessionData || typeof window === 'undefined') return;

    const now = Date.now();
    const currentPage = window.location.pathname;
    
    // Update previous page's time on page
    if (this.sessionData.pageSequence.length > 0) {
      const lastVisit = this.sessionData.pageSequence[this.sessionData.pageSequence.length - 1];
      lastVisit.timeOnPage = now - lastVisit.timestamp;
    }

    // Add new page visit
    const pageVisit: PageVisit = {
      page: currentPage,
      title: document.title,
      timestamp: now,
      interactions: 0
    };

    this.sessionData.pageSequence.push(pageVisit);
    this.sessionData.totalPageViews++;
    this.sessionData.lastActivity = now;
    
    // Not a bounce if more than one page
    if (this.sessionData.pageSequence.length > 1) {
      this.sessionData.isBounce = false;
    }

    this.lastPageChangeTime = now;
    this.pageInteractions = 0;
    this.saveSession();
  }

  /**
   * Update current page visit data
   */
  private updateCurrentPageVisit(): void {
    if (!this.sessionData || this.sessionData.pageSequence.length === 0) return;

    const currentVisit = this.sessionData.pageSequence[this.sessionData.pageSequence.length - 1];
    const now = Date.now();
    
    currentVisit.timeOnPage = now - currentVisit.timestamp;
    currentVisit.interactions = this.pageInteractions;
    
    this.sessionData.totalTimeOnSite = now - this.sessionData.startTime;
    this.sessionData.lastActivity = now;
    
    this.saveSession();
  }

  /**
   * Track user interaction on current page
   */
  public trackInteraction(): void {
    this.pageInteractions++;
    
    if (this.sessionData && this.sessionData.pageSequence.length > 0) {
      const currentVisit = this.sessionData.pageSequence[this.sessionData.pageSequence.length - 1];
      currentVisit.interactions = this.pageInteractions;
      
      // Engagement threshold: if user has interacted, it's not a bounce
      if (this.pageInteractions > 0) {
        this.sessionData.isBounce = false;
      }
      
      this.saveSession();
    }
  }

  /**
   * Update scroll depth for current page
   */
  public updateScrollDepth(scrollPercent: number): void {
    if (!this.sessionData || this.sessionData.pageSequence.length === 0) return;

    const currentVisit = this.sessionData.pageSequence[this.sessionData.pageSequence.length - 1];
    currentVisit.scrollDepth = Math.max(currentVisit.scrollDepth || 0, scrollPercent);
    
    // Significant scroll depth indicates engagement
    if (scrollPercent > 50) {
      this.sessionData.isBounce = false;
    }
    
    this.saveSession();
  }

  /**
   * Get current session data
   */
  public getSessionData(): SessionData | null {
    this.updateCurrentPageVisit();
    return this.sessionData ? { ...this.sessionData } : null;
  }

  /**
   * Get session metrics for analytics
   */
  public getSessionMetrics(): {
    sessionDuration: number;
    pageViews: number;
    bounceRate: number;
    avgTimePerPage: number;
    entryPage: string;
    exitPage: string;
    engagementScore: number;
  } | null {
    if (!this.sessionData) return null;

    const now = Date.now();
    const sessionDuration = Math.round((now - this.sessionData.startTime) / 1000);
    const avgTimePerPage = this.sessionData.totalPageViews > 0 
      ? Math.round(sessionDuration / this.sessionData.totalPageViews)
      : 0;
    
    // Calculate engagement score (0-100)
    let engagementScore = 0;
    if (!this.sessionData.isBounce) engagementScore += 30;
    if (this.sessionData.totalPageViews > 2) engagementScore += 20;
    if (sessionDuration > 30) engagementScore += 20;
    if (sessionDuration > 120) engagementScore += 20;
    
    // Interaction bonus
    const totalInteractions = this.sessionData.pageSequence.reduce(
      (sum, visit) => sum + visit.interactions, 0
    );
    if (totalInteractions > 0) engagementScore += 10;

    return {
      sessionDuration,
      pageViews: this.sessionData.totalPageViews,
      bounceRate: this.sessionData.isBounce ? 100 : 0,
      avgTimePerPage,
      entryPage: this.sessionData.entryPage,
      exitPage: this.sessionData.pageSequence[this.sessionData.pageSequence.length - 1]?.page || this.sessionData.entryPage,
      engagementScore: Math.min(100, engagementScore)
    };
  }

  /**
   * Mark session end
   */
  public endSession(): void {
    if (!this.sessionData) return;

    this.updateCurrentPageVisit();
    
    if (this.sessionData.pageSequence.length > 0) {
      this.sessionData.exitPage = this.sessionData.pageSequence[this.sessionData.pageSequence.length - 1].page;
    }
    
    this.saveSession();
  }

  /**
   * Setup page change tracking
   */
  private setupPageChangeTracking(): void {
    if (typeof window === 'undefined') return;

    // Track navigation within SPA
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('locationchange'));
      }, 0);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('locationchange'));
      }, 0);
    };

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new CustomEvent('locationchange'));
    });

    window.addEventListener('locationchange', () => {
      this.addPageVisit();
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });

    window.addEventListener('pagehide', () => {
      this.endSession();
    });
  }

  /**
   * Setup interaction tracking
   */
  private setupInteractionTracking(): void {
    if (typeof window === 'undefined') return;

    // Track various user interactions
    const interactionEvents = ['click', 'scroll', 'keydown', 'mousemove', 'touchstart'];
    
    let lastInteraction = 0;
    const throttleInterval = 1000; // 1 second throttle

    const handleInteraction = () => {
      const now = Date.now();
      if (now - lastInteraction > throttleInterval) {
        this.trackInteraction();
        lastInteraction = now;
      }
    };

    interactionEvents.forEach(event => {
      window.addEventListener(event, handleInteraction, { passive: true });
    });
  }

  /**
   * Extract UTM parameters from URL
   */
  private extractUTMParameters(): UTMParameters | undefined {
    if (typeof window === 'undefined') return undefined;

    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: UTMParameters = {};
    
    const source = urlParams.get('utm_source');
    const medium = urlParams.get('utm_medium');
    const campaign = urlParams.get('utm_campaign');
    const term = urlParams.get('utm_term');
    const content = urlParams.get('utm_content');

    if (source) utmParams.source = source;
    if (medium) utmParams.medium = medium;
    if (campaign) utmParams.campaign = campaign;
    if (term) utmParams.term = term;
    if (content) utmParams.content = content;

    return Object.keys(utmParams).length > 0 ? utmParams : undefined;
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Save session to sessionStorage
   */
  private saveSession(): void {
    if (this.sessionData && typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(this.sessionData));
      } catch (error) {
        console.warn('Failed to save session data:', error);
      }
    }
  }
}

export default SessionManager;