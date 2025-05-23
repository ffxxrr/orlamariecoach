# Orla Marie Coach Website

A professional website for Orla's meditation and mindfulness coaching services with custom privacy-focused analytics.

## Project Overview

This project creates a modern, nature-inspired website for Orla Marie Coach featuring:

- **Custom Analytics System**: Privacy-first visitor tracking replacing Google Analytics
- **Online Course Platform**: Custom system for selling meditation courses
- **Digital Samba Integration**: Seamless booking system integration
- **Professional Design**: Nature-inspired aesthetic with green color scheme
- **Privacy Compliance**: GDPR-compliant tracking with user opt-out capabilities
- **Responsive Design**: Optimized for all devices

## Project Structure

```
/
├── README.md                 # Project documentation
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies (added when platform selected)
│
├── docs/                    # Project documentation
├── src/                     # Source code
│   ├── components/          # React components
│   ├── lib/                 # Utility libraries
│   │   └── analytics/       # Custom analytics system
│   ├── pages/               # Page components/routes
│   └── styles/              # CSS and styling
│
├── public/                  # Static assets
├── content/                 # Website content and copy
├── designs/                 # Design files and mockups
├── database/                # Database schemas and migrations
├── config/                  # Configuration files
├── scripts/                 # Build and utility scripts
└── tests/                   # Test files
```

## Features

### Audio Player Integration (Completed 2025-05-23)
- **Custom Component**: Professional audio player with progress tracking
- **Free Meditation**: Lead generation through free meditation samples
- **User Experience**: Interactive controls with download capability
- **Mobile Optimization**: Touch-friendly interface on all devices
- **Accessibility**: WCAG-compliant controls and keyboard navigation

### Custom Analytics System
- **Privacy-First**: Cookie-less tracking with visitor opt-out
- **GDPR Compliant**: Data minimization and user consent management
- **Business Intelligence**: Course performance and visitor journey tracking
- **Real-time Dashboard**: Live visitor tracking and conversion analytics
- **Data Ownership**: Complete control over analytics data

### Core Website Features
1. **Course Platform**: Custom meditation course sales system
2. **Booking Integration**: Digital Samba scheduling integration
3. **Content Management**: Easy content updates and management
4. **SEO Optimization**: Search engine optimized pages and content
5. **Mobile-First Design**: Responsive design for all devices

## Technology Stack

### Frontend
- **Framework**: Next.js (React-based)
- **Styling**: Tailwind CSS with custom components
- **Analytics**: Custom JavaScript tracking library (<5KB)

### Backend
- **Database**: PostgreSQL with TimescaleDB for analytics
- **API**: Next.js API routes
- **Authentication**: Secure admin authentication

### Analytics
- **Tracking**: Fingerprint-based visitor identification
- **Dashboard**: React-based admin interface
- **Privacy**: Opt-out mechanisms and data anonymization

## Development Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Git

### Installation
```bash
# Clone repository
git clone [repository-url]
cd orlamariecoach

# Install dependencies (after platform selection)
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Set up database
npm run db:setup

# Start development server
npm run dev
```

## Design Direction

### Visual Style
- **Color Palette**: Green-focused with earth tones (avoiding yellow/red)
- **Typography**: Clean, readable fonts conveying professionalism
- **Imagery**: Nature-inspired elements (trees, leaves, natural textures)
- **Layout**: Minimalist with plenty of white space

### User Experience
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Fast loading times and optimized images
- **Mobile-First**: Touch-friendly interface elements
- **Navigation**: Intuitive structure focusing on courses and booking

## Project Status

### Current Progress: 45%

- ✅ Repository structure and planning completed
- ✅ Custom analytics system designed
- ✅ Project documentation and progress tracking implemented
- ✅ Platform selected: Next.js with TypeScript
- ✅ Design phase completed with approved mockups
- ✅ Production-ready homepage implemented
- ✅ Audio player integration completed
- 🔄 Additional pages development in progress
- 🔄 Content integration ongoing

### Next Milestones
- **Platform Selection**: May 24, 2025
- **Phase 1 Completion**: May 31, 2025
- **Content Plan**: June 7, 2025
- **Design Mockups**: June 21, 2025

## Analytics Features

### Visitor Tracking
- Page views and session duration
- Visitor journey mapping
- Return visitor identification
- Geographic analytics (privacy-compliant)

### Course Analytics
- Course page performance
- Booking conversion tracking
- Popular content identification
- Seasonal demand patterns

### Privacy Controls
- User opt-out mechanism
- Data retention controls
- No personal data collection
- GDPR compliance tools

## Documentation

### Project Management
- **Main Documentation**: Obsidian vault at `C:\Users\ffxxr\Documents\Obsidian Vault\01-Projects\Personal\OrlaMarieCoach-Website`
- **Progress Tracking**: Detailed progress monitoring with percentages
- **Daily Updates**: Regular progress logs and git commit tracking

### Technical Documentation
- **API Documentation**: `/docs/api/`
- **Database Schema**: `/database/schema.sql`
- **Analytics Implementation**: `/docs/analytics/`
- **Deployment Guide**: `/docs/deployment/`

## Links

- **Current Website**: [orlamariecoach.com](https://orlamariecoach.com/)
- **Project Dashboard**: See Obsidian vault for detailed project tracking
- **Design Assets**: `/designs/` directory
- **Content Strategy**: `/content/` directory

---

*For detailed project management and progress tracking, refer to the Obsidian vault documentation.*

**Last Updated**: 2025-05-23
