/**
 * Privacy Controls and GDPR Compliance
 * Comprehensive privacy management for analytics tracking
 */

export interface ConsentSettings {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: Date;
  version: string;
}

export interface PrivacyConfig {
  respectDoNotTrack: boolean;
  requireExplicitConsent: boolean;
  dataRetentionDays: number;
  enableCookieConsent: boolean;
  showPrivacyNotice: boolean;
  anonymizeIP: boolean;
}

export interface DataSubjectRights {
  canAccess: boolean;
  canRectify: boolean;
  canErase: boolean;
  canPortability: boolean;
  canObject: boolean;
  canRestrict: boolean;
}

class PrivacyManager {
  private static readonly CONSENT_STORAGE_KEY = 'analytics_consent';
  private static readonly OPT_OUT_STORAGE_KEY = 'analytics_opt_out';
  private static readonly PRIVACY_VERSION = '1.0';
  
  private config: PrivacyConfig;
  private consentBanner?: HTMLElement;

  constructor(config: Partial<PrivacyConfig> = {}) {
    this.config = {
      respectDoNotTrack: true,
      requireExplicitConsent: true,
      dataRetentionDays: 365,
      enableCookieConsent: false, // We're cookie-less
      showPrivacyNotice: true,
      anonymizeIP: true,
      ...config
    };
  }

  /**
   * Check if analytics tracking is allowed
   */
  public isTrackingAllowed(): boolean {
    // Check opt-out status first
    if (this.isOptedOut()) {
      return false;
    }

    // Check Do Not Track if configured
    if (this.config.respectDoNotTrack && this.hasDoNotTrack()) {
      return false;
    }

    // Check consent if required
    if (this.config.requireExplicitConsent) {
      const consent = this.getConsentSettings();
      return consent?.analytics === true;
    }

    // Default to true if no explicit consent required
    return true;
  }

  /**
   * Get current consent settings
   */
  public getConsentSettings(): ConsentSettings | null {
    try {
      const stored = localStorage.getItem(PrivacyManager.CONSENT_STORAGE_KEY);
      if (!stored) return null;

      const consent = JSON.parse(stored);
      
      // Check if consent is current version
      if (consent.version !== PrivacyManager.PRIVACY_VERSION) {
        this.clearConsent();
        return null;
      }

      return {
        ...consent,
        timestamp: new Date(consent.timestamp)
      };
    } catch (error) {
      console.warn('Failed to parse consent settings:', error);
      return null;
    }
  }

  /**
   * Set consent settings
   */
  public async setConsentSettings(settings: Partial<ConsentSettings>): Promise<void> {
    const consent: ConsentSettings = {
      analytics: false,
      functional: true, // Always true for site functionality
      marketing: false,
      timestamp: new Date(),
      version: PrivacyManager.PRIVACY_VERSION,
      ...settings
    };

    try {
      // Store locally first
      localStorage.setItem(
        PrivacyManager.CONSENT_STORAGE_KEY,
        JSON.stringify({
          ...consent,
          timestamp: consent.timestamp.toISOString()
        })
      );

      // Send to server if analytics is enabled
      if (consent.analytics) {
        await this.sendConsentToServer(true, 'analytics');
      } else {
        await this.sendConsentToServer(false, 'analytics');
      }

      // Emit consent change event
      this.emitConsentChange(consent);
    } catch (error) {
      console.warn('Failed to save consent settings:', error);
    }
  }

  /**
   * Send consent to server
   */
  private async sendConsentToServer(hasConsented: boolean, consentType: string): Promise<void> {
    try {
      const visitorId = this.getVisitorId();
      
      await fetch('/api/analytics/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          hasConsented,
          consentType,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.warn('Failed to send consent to server:', error);
    }
  }

  /**
   * Get visitor ID for consent tracking
   */
  private getVisitorId(): string {
    let visitorId = localStorage.getItem('analytics_visitor_id');
    if (!visitorId) {
      visitorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('analytics_visitor_id', visitorId);
    }
    return visitorId;
  }

  /**
   * Grant analytics consent
   */
  public async grantConsent(): Promise<void> {
    await this.setConsentSettings({
      analytics: true,
      functional: true,
      marketing: false
    });
    this.hideConsentBanner();
  }

  /**
   * Deny analytics consent
   */
  public async denyConsent(): Promise<void> {
    await this.setConsentSettings({
      analytics: false,
      functional: true,
      marketing: false
    });
    this.hideConsentBanner();
  }

  /**
   * Opt out of all tracking
   */
  public optOut(): void {
    localStorage.setItem(PrivacyManager.OPT_OUT_STORAGE_KEY, 'true');
    this.clearConsent();
    this.clearAnalyticsData();
    this.emitOptOut();
  }

  /**
   * Opt back in to tracking
   */
  public optIn(): void {
    localStorage.removeItem(PrivacyManager.OPT_OUT_STORAGE_KEY);
    this.showConsentBanner();
  }

  /**
   * Check if user has opted out
   */
  public isOptedOut(): boolean {
    return localStorage.getItem(PrivacyManager.OPT_OUT_STORAGE_KEY) === 'true';
  }

  /**
   * Check for Do Not Track signal
   */
  public hasDoNotTrack(): boolean {
    return navigator.doNotTrack === '1' || 
           (navigator as any).msDoNotTrack === '1' ||
           (window as any).doNotTrack === '1';
  }

  /**
   * Clear all consent data
   */
  public clearConsent(): void {
    localStorage.removeItem(PrivacyManager.CONSENT_STORAGE_KEY);
  }

  /**
   * Clear all analytics data from storage
   */
  public clearAnalyticsData(): void {
    // Clear visitor data
    localStorage.removeItem('analytics_visitor_info');
    localStorage.removeItem('analytics_visitor_id');
    
    // Clear session data
    sessionStorage.removeItem('analytics_session_id');
    sessionStorage.removeItem('analytics_session_info');
    sessionStorage.removeItem('analytics_session_timestamp');
    sessionStorage.removeItem('analytics_fingerprint');
    
    // Clear any other analytics-related data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('analytics_')) {
        localStorage.removeItem(key);
      }
    });

    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('analytics_')) {
        sessionStorage.removeItem(key);
      }
    });
  }

  /**
   * Show consent banner
   */
  public showConsentBanner(): void {
    if (!this.config.showPrivacyNotice || this.getConsentSettings()) {
      return;
    }

    // Remove existing banner
    this.hideConsentBanner();

    // Create banner
    this.consentBanner = document.createElement('div');
    this.consentBanner.id = 'analytics-consent-banner';
    this.consentBanner.innerHTML = this.getConsentBannerHTML();
    
    // Add styles
    this.consentBanner.style.cssText = this.getConsentBannerStyles();
    
    // Add to page
    document.body.appendChild(this.consentBanner);
    
    // Add event listeners
    this.setupConsentBannerEvents();
  }

  /**
   * Hide consent banner
   */
  public hideConsentBanner(): void {
    if (this.consentBanner) {
      this.consentBanner.remove();
      this.consentBanner = undefined;
    }
  }

  /**
   * Get data subject rights for GDPR compliance
   */
  public getDataSubjectRights(): DataSubjectRights {
    return {
      canAccess: true,     // Right to access personal data
      canRectify: true,    // Right to rectification
      canErase: true,      // Right to erasure (right to be forgotten)
      canPortability: true, // Right to data portability
      canObject: true,     // Right to object to processing
      canRestrict: true    // Right to restrict processing
    };
  }

  /**
   * Export user data (GDPR Article 20)
   */
  public exportUserData(): any {
    const visitorInfo = localStorage.getItem('analytics_visitor_info');
    const consentSettings = this.getConsentSettings();
    
    return {
      consent: consentSettings,
      visitorInfo: visitorInfo ? JSON.parse(visitorInfo) : null,
      optOutStatus: this.isOptedOut(),
      exportDate: new Date().toISOString(),
      dataRetention: `${this.config.dataRetentionDays} days`
    };
  }

  /**
   * Generate privacy notice text
   */
  public getPrivacyNoticeText(): string {
    return `
      We use privacy-first analytics to understand how visitors use our website. 
      No cookies are used, and no personal information is collected. 
      You can opt out at any time. 
      
      Data collected includes:
      - Page views and navigation patterns
      - Device type and screen size
      - General location (country/region)
      - Time spent on pages
      
      Data is retained for ${this.config.dataRetentionDays} days and then automatically deleted.
      
      You have the right to:
      - Access your data
      - Request deletion
      - Opt out of tracking
      - Object to processing
    `;
  }

  /**
   * Emit consent change event
   */
  private emitConsentChange(consent: ConsentSettings): void {
    window.dispatchEvent(new CustomEvent('analyticsConsentChange', {
      detail: consent
    }));
  }

  /**
   * Emit opt-out event
   */
  private emitOptOut(): void {
    window.dispatchEvent(new CustomEvent('analyticsOptOut'));
  }

  /**
   * Get consent banner HTML
   */
  private getConsentBannerHTML(): string {
    return `
      <div class="consent-content">
        <div class="consent-text">
          <h3>Privacy-First Analytics</h3>
          <p>We use privacy-first analytics to improve our website. No cookies, no personal data collection. You can opt out anytime.</p>
        </div>
        <div class="consent-actions">
          <button id="consent-accept" class="consent-btn consent-accept">Accept</button>
          <button id="consent-decline" class="consent-btn consent-decline">Decline</button>
          <button id="consent-info" class="consent-btn consent-info">Learn More</button>
        </div>
      </div>
    `;
  }

  /**
   * Get consent banner styles
   */
  private getConsentBannerStyles(): string {
    return `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #f8f9f0;
      border-top: 2px solid #2d5a3d;
      padding: 1rem;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
      z-index: 9999;
      font-family: 'Inter', sans-serif;
      
      .consent-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }
      
      .consent-text h3 {
        margin: 0 0 0.5rem 0;
        color: #2d5a3d;
        font-size: 1.1rem;
      }
      
      .consent-text p {
        margin: 0;
        color: #4a5568;
        font-size: 0.9rem;
        line-height: 1.4;
      }
      
      .consent-actions {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }
      
      .consent-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.2s;
      }
      
      .consent-accept {
        background: #2d5a3d;
        color: white;
      }
      
      .consent-accept:hover {
        background: #1e3a28;
      }
      
      .consent-decline {
        background: #e2e8f0;
        color: #4a5568;
      }
      
      .consent-decline:hover {
        background: #cbd5e0;
      }
      
      .consent-info {
        background: transparent;
        color: #2d5a3d;
        text-decoration: underline;
      }
      
      @media (max-width: 768px) {
        .consent-content {
          flex-direction: column;
          text-align: center;
        }
        
        .consent-actions {
          width: 100%;
          justify-content: center;
        }
      }
    `;
  }

  /**
   * Setup consent banner event listeners
   */
  private setupConsentBannerEvents(): void {
    const acceptBtn = document.getElementById('consent-accept');
    const declineBtn = document.getElementById('consent-decline');
    const infoBtn = document.getElementById('consent-info');

    acceptBtn?.addEventListener('click', async () => {
      acceptBtn.textContent = 'Processing...';
      await this.grantConsent();
    });
    
    declineBtn?.addEventListener('click', async () => {
      declineBtn.textContent = 'Processing...';
      await this.denyConsent();
    });
    
    infoBtn?.addEventListener('click', () => this.showPrivacyInfo());
  }

  /**
   * Show privacy information modal/page
   */
  private showPrivacyInfo(): void {
    // For now, just alert - could be enhanced with a modal
    alert(this.getPrivacyNoticeText());
  }
}

export default PrivacyManager;