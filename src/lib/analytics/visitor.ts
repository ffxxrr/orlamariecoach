/**
 * Visitor Identification and Management
 * Privacy-first visitor tracking without cookies
 */

export interface VisitorInfo {
  id: string;
  sessionId: string;
  isNewVisitor: boolean;
  isReturningVisitor: boolean;
  sessionCount: number;
  firstVisit: Date;
  lastVisit: Date;
  fingerprint: string;
}

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  screenResolution: string;
  colorDepth: number;
  timezone: string;
  language: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone: string;
  language: string;
}

class VisitorManager {
  private static readonly VISITOR_STORAGE_KEY = 'analytics_visitor_info';
  private static readonly SESSION_STORAGE_KEY = 'analytics_session_info';
  private static readonly FINGERPRINT_CACHE_KEY = 'analytics_fingerprint';

  /**
   * Get or create visitor information
   */
  public static getVisitorInfo(): VisitorInfo {
    const stored = localStorage.getItem(this.VISITOR_STORAGE_KEY);
    const fingerprint = this.generateFingerprint();
    
    if (stored) {
      try {
        const visitorData = JSON.parse(stored);
        
        // Verify fingerprint matches (device hasn't changed significantly)
        if (visitorData.fingerprint === fingerprint) {
          const sessionId = this.getOrCreateSessionId();
          const isNewSession = sessionId !== visitorData.currentSessionId;
          
          // Update visitor info
          const updatedInfo: VisitorInfo = {
            ...visitorData,
            sessionId,
            isNewVisitor: false,
            isReturningVisitor: true,
            sessionCount: isNewSession ? visitorData.sessionCount + 1 : visitorData.sessionCount,
            lastVisit: new Date(),
            firstVisit: new Date(visitorData.firstVisit)
          };
          
          this.saveVisitorInfo(updatedInfo);
          return updatedInfo;
        }
      } catch (error) {
        console.warn('Failed to parse stored visitor info:', error);
      }
    }
    
    // Create new visitor
    const newVisitor: VisitorInfo = {
      id: this.generateVisitorId(),
      sessionId: this.getOrCreateSessionId(),
      isNewVisitor: true,
      isReturningVisitor: false,
      sessionCount: 1,
      firstVisit: new Date(),
      lastVisit: new Date(),
      fingerprint
    };
    
    this.saveVisitorInfo(newVisitor);
    return newVisitor;
  }

  /**
   * Get device information
   */
  public static getDeviceInfo(): DeviceInfo {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    return {
      userAgent,
      platform,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      isMobile: this.isMobileDevice(),
      isTablet: this.isTabletDevice(),
      isDesktop: this.isDesktopDevice()
    };
  }

  /**
   * Get location information (client-side only)
   */
  public static getLocationInfo(): LocationInfo {
    return {
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language
    };
  }

  /**
   * Generate visitor fingerprint
   */
  public static generateFingerprint(): string {
    // Check cache first
    const cached = sessionStorage.getItem(this.FINGERPRINT_CACHE_KEY);
    if (cached) {
      return cached;
    }

    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      this.getCanvasFingerprint(),
      this.getWebGLFingerprint(),
      navigator.hardwareConcurrency || 'unknown',
      (navigator as any).deviceMemory || 'unknown'
    ];

    const fingerprint = this.hashString(components.join('|'));
    sessionStorage.setItem(this.FINGERPRINT_CACHE_KEY, fingerprint);
    return fingerprint;
  }

  /**
   * Get or create session ID
   */
  public static getOrCreateSessionId(): string {
    const sessionKey = 'analytics_session_id';
    const timestampKey = 'analytics_session_timestamp';
    
    const existing = sessionStorage.getItem(sessionKey);
    const timestamp = sessionStorage.getItem(timestampKey);
    
    const now = Date.now();
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes
    
    if (existing && timestamp) {
      const lastActivity = parseInt(timestamp, 10);
      if (now - lastActivity < sessionTimeout) {
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
   * Clear visitor data (for privacy compliance)
   */
  public static clearVisitorData(): void {
    localStorage.removeItem(this.VISITOR_STORAGE_KEY);
    sessionStorage.removeItem(this.SESSION_STORAGE_KEY);
    sessionStorage.removeItem(this.FINGERPRINT_CACHE_KEY);
    sessionStorage.removeItem('analytics_session_id');
    sessionStorage.removeItem('analytics_session_timestamp');
  }

  /**
   * Check if visitor tracking is enabled
   */
  public static isTrackingEnabled(): boolean {
    // Check for opt-out
    if (localStorage.getItem('analytics_opt_out') === 'true') {
      return false;
    }
    
    // Check Do Not Track
    if (navigator.doNotTrack === '1') {
      return false;
    }
    
    return true;
  }

  /**
   * Generate unique visitor ID
   */
  private static generateVisitorId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return `visitor_${timestamp}_${random}`;
  }

  /**
   * Generate session ID
   */
  private static generateSessionId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2);
    return `session_${timestamp}_${random}`;
  }

  /**
   * Save visitor information to storage
   */
  private static saveVisitorInfo(visitorInfo: VisitorInfo): void {
    try {
      const dataToStore = {
        ...visitorInfo,
        currentSessionId: visitorInfo.sessionId,
        // Convert dates to strings for storage
        firstVisit: visitorInfo.firstVisit.toISOString(),
        lastVisit: visitorInfo.lastVisit.toISOString()
      };
      
      localStorage.setItem(this.VISITOR_STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.warn('Failed to save visitor info:', error);
    }
  }

  /**
   * Get canvas fingerprint
   */
  private static getCanvasFingerprint(): string {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return 'no-canvas';
      
      canvas.width = 200;
      canvas.height = 50;
      
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('Analytics fingerprint 🔒', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Analytics fingerprint 🔒', 4, 17);
      
      return canvas.toDataURL();
    } catch (error) {
      return 'canvas-error';
    }
  }

  /**
   * Get WebGL fingerprint
   */
  private static getWebGLFingerprint(): string {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) return 'no-webgl';
      
      const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
      if (!debugInfo) return 'no-debug-info';
      
      const vendor = (gl as any).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      
      return `${vendor}~${renderer}`;
    } catch (error) {
      return 'webgl-error';
    }
  }

  /**
   * Simple hash function
   */
  private static hashString(str: string): string {
    let hash = 0;
    if (str.length === 0) return hash.toString();
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  /**
   * Check if device is mobile
   */
  private static isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  /**
   * Check if device is tablet
   */
  private static isTabletDevice(): boolean {
    return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
  }

  /**
   * Check if device is desktop
   */
  private static isDesktopDevice(): boolean {
    return !this.isMobileDevice() && !this.isTabletDevice();
  }
}

export default VisitorManager;