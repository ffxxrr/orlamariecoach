# Configuration Directory

This directory contains all configuration files for different environments and features.

## Structure

```
config/
├── database.js                # Database connection settings
├── analytics.js              # Analytics configuration
├── auth.js                   # Authentication settings
├── environment/              # Environment-specific configs
│   ├── development.json      # Development environment
│   ├── staging.json          # Staging environment
│   └── production.json       # Production environment
├── deployment/               # Deployment configurations
│   ├── docker-compose.yml    # Docker setup
│   └── nginx.conf           # Web server configuration
└── features/                 # Feature-specific configs
    ├── booking-integration.js # Digital Samba config
    └── email.js              # Email service configuration
```

## Configuration Guidelines

### Environment Variables
- Use .env files for sensitive data
- Never commit secrets to version control
- Provide .env.example template

### Database Configuration
- Connection pooling settings
- Migration configuration
- Backup and restore settings

### Analytics Configuration
- Data retention policies
- Privacy settings
- Performance optimization

### Security Configuration
- Authentication methods
- API rate limiting
- CORS settings
- SSL/TLS configuration

## Usage

Each configuration file exports environment-specific settings:

```javascript
// Example: database.js
module.exports = {
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'orlacoach_dev'
  },
  production: {
    // Production settings
  }
};
```
