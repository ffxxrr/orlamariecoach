/**
 * Error Tracking and Performance Monitoring
 * Captures client-side errors and performance issues
 */

export interface ErrorReport {
  type: 'javascript_error' | 'promise_rejection' | 'resource_error' | 'network_error';
  message: string;
  stack?: string;
  filename?: string;
  lineNumber?: number;
  columnNumber?: number;
  userAgent: string;
  url: string;
  timestamp: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

export interface PerformanceIssue {
  type: 'slow_page_load' | 'memory_leak' | 'high_cpu' | 'slow_interaction';
  metric: string;
  value: number;
  threshold: number;
  url: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class ErrorTracker {
  private analytics: any;
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceIssue[] = [];
  private maxQueueSize = 50;
  
  // Performance thresholds
  private thresholds = {
    slowPageLoad: 3000, // 3 seconds
    slowInteraction: 100, // 100ms
    longTask: 50, // 50ms
    memoryWarning: 50 * 1024 * 1024, // 50MB
  };

  constructor(analytics?: any) {
    this.analytics = analytics;
    this.setupErrorHandlers();
    this.setupPerformanceMonitoring();
  }

  /**
   * Setup global error handlers
   */
  private setupErrorHandlers(): void {
    if (typeof window === 'undefined') return;

    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureError({
        type: 'javascript_error',
        message: event.message,
        stack: event.error?.stack,
        filename: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now(),
        severity: this.determineSeverity(event.error),
        metadata: {
          errorType: event.error?.name,
          errorConstructor: event.error?.constructor?.name
        }
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        type: 'promise_rejection',
        message: String(event.reason),
        stack: event.reason?.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now(),
        severity: 'medium',
        metadata: {
          reason: event.reason,
          reasonType: typeof event.reason
        }
      });
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        const target = event.target as HTMLElement;
        this.captureError({
          type: 'resource_error',
          message: `Failed to load resource: ${target.tagName}`,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: Date.now(),
          severity: 'low',
          metadata: {
            resourceType: target.tagName,
            resourceSrc: (target as any).src || (target as any).href,
            resourceId: target.id || 'unknown'
          }
        });
      }
    }, true);

    // Network errors (fetch/XMLHttpRequest)
    this.interceptNetworkRequests();
  }

  /**
   * Setup performance monitoring
   */
  private setupPerformanceMonitoring(): void {
    if (typeof window === 'undefined' || !window.performance) return;

    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.checkPageLoadPerformance();
      }, 1000);
    });

    // Monitor Long Tasks (if supported)
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > this.thresholds.longTask) {
              this.capturePerformanceIssue({
                type: 'slow_interaction',
                metric: 'longTask',
                value: entry.duration,
                threshold: this.thresholds.longTask,
                url: window.location.href,
                timestamp: Date.now(),
                metadata: {
                  taskName: entry.name,
                  startTime: entry.startTime,
                  attribution: (entry as any).attribution
                }
              });
            }
          });
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long Task API not supported
      }

      // Monitor Layout Shifts (CLS)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if ((entry as any).value > 0.1) { // CLS threshold
              this.capturePerformanceIssue({
                type: 'slow_interaction',
                metric: 'cumulativeLayoutShift',
                value: (entry as any).value,
                threshold: 0.1,
                url: window.location.href,
                timestamp: Date.now(),
                metadata: {
                  sources: (entry as any).sources
                }
              });
            }
          });
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // CLS not supported
      }
    }

    // Monitor memory usage (if supported)
    if ('memory' in performance) {
      setInterval(() => {
        this.checkMemoryUsage();
      }, 30000); // Check every 30 seconds
    }
  }

  /**
   * Intercept network requests to catch errors
   */
  private interceptNetworkRequests(): void {
    if (typeof window === 'undefined') return;

    // Intercept fetch
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        if (!response.ok) {
          this.captureError({
            type: 'network_error',
            message: `Network request failed: ${response.status} ${response.statusText}`,
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: Date.now(),
            severity: response.status >= 500 ? 'high' : 'medium',
            metadata: {
              requestUrl: args[0],
              requestMethod: (args[1] as any)?.method || 'GET',
              responseStatus: response.status,
              responseStatusText: response.statusText
            }
          });
        }
        
        return response;
      } catch (error) {
        this.captureError({
          type: 'network_error',
          message: `Network request failed: ${error}`,
          stack: (error as Error)?.stack,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: Date.now(),
          severity: 'high',
          metadata: {
            requestUrl: args[0],
            requestMethod: (args[1] as any)?.method || 'GET',
            errorType: (error as Error)?.name
          }
        });
        throw error;
      }
    };
  }

  /**
   * Check page load performance
   */
  private checkPageLoadPerformance(): void {
    if (!window.performance) return;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) return;

    const loadTime = navigation.loadEventEnd - navigation.fetchStart;
    const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;

    if (loadTime > this.thresholds.slowPageLoad) {
      this.capturePerformanceIssue({
        type: 'slow_page_load',
        metric: 'loadTime',
        value: loadTime,
        threshold: this.thresholds.slowPageLoad,
        url: window.location.href,
        timestamp: Date.now(),
        metadata: {
          domContentLoaded,
          navigationTiming: {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            connect: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            dom: navigation.domContentLoadedEventEnd - navigation.responseEnd
          }
        }
      });
    }
  }

  /**
   * Check memory usage
   */
  private checkMemoryUsage(): void {
    const memory = (performance as any).memory;
    if (!memory) return;

    const used = memory.usedJSHeapSize;
    const total = memory.totalJSHeapSize;
    const limit = memory.jsHeapSizeLimit;

    // Warning if using more than threshold or 80% of limit
    if (used > this.thresholds.memoryWarning || used / limit > 0.8) {
      this.capturePerformanceIssue({
        type: 'memory_leak',
        metric: 'heapUsage',
        value: used,
        threshold: this.thresholds.memoryWarning,
        url: window.location.href,
        timestamp: Date.now(),
        metadata: {
          usedJSHeapSize: used,
          totalJSHeapSize: total,
          jsHeapSizeLimit: limit,
          usagePercentage: Math.round((used / limit) * 100)
        }
      });
    }
  }

  /**
   * Determine error severity
   */
  private determineSeverity(error: Error): ErrorReport['severity'] {
    if (!error) return 'low';

    const message = error.message?.toLowerCase() || '';
    const stack = error.stack?.toLowerCase() || '';

    // Critical errors
    if (message.includes('security') || 
        message.includes('cors') || 
        stack.includes('securityerror')) {
      return 'critical';
    }

    // High severity errors
    if (message.includes('typeerror') || 
        message.includes('referenceerror') || 
        message.includes('syntaxerror')) {
      return 'high';
    }

    // Medium severity errors
    if (message.includes('network') || 
        message.includes('fetch') || 
        message.includes('timeout')) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Capture and queue error
   */
  private captureError(error: ErrorReport): void {
    // Filter out noise
    if (this.shouldIgnoreError(error)) {
      return;
    }

    this.errorQueue.push(error);
    
    // Keep queue size manageable
    if (this.errorQueue.length > this.maxQueueSize) {
      this.errorQueue.shift();
    }

    // Send to analytics if available
    if (this.analytics) {
      this.analytics.trackEvent('error', error);
    }

    // Send critical errors immediately
    if (error.severity === 'critical') {
      this.flushErrors();
    }
  }

  /**
   * Capture and queue performance issue
   */
  private capturePerformanceIssue(issue: PerformanceIssue): void {
    this.performanceQueue.push(issue);
    
    // Keep queue size manageable
    if (this.performanceQueue.length > this.maxQueueSize) {
      this.performanceQueue.shift();
    }

    // Send to analytics if available
    if (this.analytics) {
      this.analytics.trackEvent('performance_issue', issue);
    }
  }

  /**
   * Check if error should be ignored (common browser noise)
   */
  private shouldIgnoreError(error: ErrorReport): boolean {
    const message = error.message?.toLowerCase() || '';
    
    // Common browser extension errors
    const ignoredMessages = [
      'script error',
      'non-error promise rejection captured',
      'resizeobserver loop limit exceeded',
      'extension context invalidated',
      'invocation of non-function',
      'object doesn\'t support property'
    ];

    return ignoredMessages.some(ignored => message.includes(ignored)) ||
           (error.filename?.includes('extension://') ?? false) ||
           (error.filename?.includes('moz-extension://') ?? false);
  }

  /**
   * Get current error queue
   */
  public getErrors(): ErrorReport[] {
    return [...this.errorQueue];
  }

  /**
   * Get current performance issues
   */
  public getPerformanceIssues(): PerformanceIssue[] {
    return [...this.performanceQueue];
  }

  /**
   * Manually flush errors to server
   */
  public flushErrors(): void {
    if (this.errorQueue.length === 0) return;

    // In a real implementation, you'd send to your error reporting service
    console.groupCollapsed('🚨 Client Errors Detected');
    this.errorQueue.forEach(error => {
      console.error(`[${error.severity.toUpperCase()}] ${error.type}:`, error);
    });
    console.groupEnd();

    this.errorQueue = [];
  }

  /**
   * Manually flush performance issues to server
   */
  public flushPerformance(): void {
    if (this.performanceQueue.length === 0) return;

    console.groupCollapsed('⚡ Performance Issues Detected');
    this.performanceQueue.forEach(issue => {
      console.warn(`[PERF] ${issue.type}: ${issue.metric} = ${issue.value} (threshold: ${issue.threshold})`);
    });
    console.groupEnd();

    this.performanceQueue = [];
  }

  /**
   * Get error summary statistics
   */
  public getErrorStats(): {
    totalErrors: number;
    errorsBySeverity: Record<string, number>;
    errorsByType: Record<string, number>;
    recentErrors: number;
  } {
    const now = Date.now();
    const recentThreshold = 5 * 60 * 1000; // 5 minutes

    const errorsBySeverity = this.errorQueue.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const errorsByType = this.errorQueue.reduce((acc, error) => {
      acc[error.type] = (acc[error.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentErrors = this.errorQueue.filter(
      error => now - error.timestamp < recentThreshold
    ).length;

    return {
      totalErrors: this.errorQueue.length,
      errorsBySeverity,
      errorsByType,
      recentErrors
    };
  }
}

export default ErrorTracker;