# Database Directory

This directory contains all database-related files including schemas, migrations, and seed data.

## Structure

```
database/
├── migrations/              # Database migration files
├── seeds/                  # Database seed data
├── schema.sql             # Main database schema
├── analytics-schema.sql   # Analytics database schema
└── backup-scripts/        # Database backup utilities
```

## Database Design

### Main Application Tables
- **users**: Admin users and authentication
- **courses**: Meditation course information
- **bookings**: Digital Samba booking integration data
- **testimonials**: Client testimonials and reviews
- **content**: Dynamic content management

### Analytics Tables
- **visitors**: Visitor tracking and identification
- **sessions**: Visit sessions and duration tracking
- **page_views**: Individual page view tracking
- **events**: Custom event tracking (bookings, form submissions)
- **course_interactions**: Course-specific analytics

## Migration Strategy

### Development
- Use migration files for schema changes
- Seed data for testing and development
- Regular backup procedures

### Production
- Automated migration deployment
- Data backup before migrations
- Rollback procedures documented

## Analytics Database

### Time-Series Data
- Optimized for time-based queries
- Automatic data aggregation
- Configurable data retention periods

### Privacy Compliance
- No personal data storage without consent
- Automatic data anonymization
- User opt-out capabilities
