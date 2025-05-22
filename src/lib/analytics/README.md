# Custom Analytics Library

This directory contains the custom analytics tracking library for the Orla Marie Coach website.

## Structure

```
src/lib/analytics/
├── index.js              # Main analytics library export
├── tracker.js            # Core tracking functionality
├── visitor.js            # Visitor identification and management
├── events.js             # Event tracking utilities
├── privacy.js            # Privacy controls and opt-out
├── dashboard/            # Admin dashboard utilities
│   ├── api.js            # Dashboard API client
│   ├── charts.js         # Chart data processing
│   └── reports.js        # Report generation
└── types/                # TypeScript type definitions
    ├── visitor.ts         # Visitor-related types
    ├── events.ts          # Event tracking types
    └── dashboard.ts       # Dashboard data types
```

## Core Features

### Visitor Tracking
- Cookie-less visitor identification using fingerprinting
- Session management and duration tracking
- Return visitor recognition
- Geographic location detection (privacy-compliant)

### Event Tracking
- Page view tracking with metadata
- Custom event tracking (form submissions, downloads)
- Course interaction tracking
- Booking funnel analytics

### Privacy Controls
- User opt-out mechanism
- GDPR compliance features
- Data minimization practices
- Consent management

### Performance
- Lightweight tracking script (<5KB)
- Asynchronous data transmission
- Local storage fallbacks
- Error handling and recovery

## Usage Examples

### Basic Tracking
```javascript
import Analytics from '@/lib/analytics';

// Initialize analytics
const analytics = new Analytics({
  apiEndpoint: '/api/analytics',
  privacyMode: true,
  enableConsent: true
});

// Track page view
analytics.trackPageView();

// Track custom event
analytics.trackEvent('course_view', {
  courseId: 'meditation-basics',
  duration: 120
});
```

### Course-Specific Tracking
```javascript
// Track course interactions
analytics.trackCourseInteraction('course_enquiry', {
  courseId: 'advanced-mindfulness',
  source: 'homepage_banner'
});

// Track booking attempts
analytics.trackBookingFlow('booking_started', {
  courseType: 'one-on-one',
  preferredTime: 'evening'
});
```

### Privacy Controls
```javascript
// Check opt-out status
if (!analytics.isOptedOut()) {
  analytics.trackPageView();
}

// Provide opt-out mechanism
analytics.optOut();

// Respect Do Not Track
if (navigator.doNotTrack === '1') {
  analytics.disable();
}
```

## Dashboard Integration

### Real-time Data
- WebSocket connections for live updates
- Real-time visitor counting
- Live page view tracking

### Data Visualization
- Chart.js integration for graphs
- Custom visualization components
- Export functionality for reports

### Business Intelligence
- Course performance analytics
- Visitor journey mapping
- Conversion funnel analysis
- Seasonal trend identification

## Privacy Implementation

### Data Collection
- Minimal data collection practices
- Anonymized visitor tracking
- No personal information storage
- Configurable data retention

### Compliance
- GDPR Article 25 (Privacy by Design)
- No cookies required for basic tracking
- Clear privacy policy integration
- User control over data collection

### Security
- Encrypted data transmission
- Secure API endpoints
- Input validation and sanitization
- Rate limiting for abuse prevention

## Testing

### Unit Tests
- Individual function testing
- Mock external dependencies
- Privacy compliance verification

### Integration Tests
- End-to-end tracking flow
- Database integration
- Dashboard functionality

### Performance Tests
- Page load impact measurement
- Analytics script performance
- Database query optimization

## Configuration

### Environment Variables
```env
ANALYTICS_API_ENDPOINT=/api/analytics
ANALYTICS_DATABASE_URL=postgresql://...
ANALYTICS_RETENTION_DAYS=365
ANALYTICS_PRIVACY_MODE=true
```

### Feature Flags
- Enable/disable specific tracking features
- A/B testing for analytics improvements
- Gradual rollout capabilities

This custom analytics library provides comprehensive visitor insights while maintaining the highest standards of user privacy and data protection.
