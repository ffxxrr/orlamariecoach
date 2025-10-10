# Orla Marie Coach Website

A professional website for Orla's meditation and mindfulness coaching services with custom privacy-focused analytics.

## Project Overview

This project creates a modern, nature-inspired website for Orla Marie Coach featuring:

- **Custom Analytics System**: Privacy-first visitor tracking replacing Google Analytics (NOT YET IMPLEMENTED)
- **Online Course Platform**: Custom system for selling meditation courses
- **Digital Samba Integration**: Seamless booking system integration
- **Professional Design**: Nature-inspired aesthetic with green color scheme
- **Privacy Compliance**: GDPR-compliant tracking with user opt-out capabilities (PENDING ANALYTICS IMPLEMENTATION)
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
│   ├── app/                 # Next.js App Router structure
│   │   ├── layout.tsx       # Root layout component
│   │   ├── page.tsx         # Homepage component
│   │   ├── about/           # About page route
│   │   ├── services/        # Services page route
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── audio/           # Audio player components
│   │   ├── home/            # Homepage components
│   │   ├── about/           # About page components
│   │   ├── services/        # Services page components
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── ui/              # UI components (BotanicalAccents, etc.)
│   └── lib/                 # Utility libraries
│       └── analytics/       # Custom analytics system
│
├── public/                  # Static assets
│   ├── images/              # Image assets
│   │   └── orla/            # Photos of Orla
│   └── media/               # Media files
│       └── audio/           # Audio recordings
│           └── meditations/ # Meditation audio files
├── content/                 # Website content and copy
├── designs/                 # Design files and mockups
├── database/                # Database schemas and migrations
├── config/                  # Configuration files
├── scripts/                 # Build and utility scripts
└── tests/                   # Test files
```

## Features

### Audio Player Integration (Completed 2025-05-24)
- **Multi-Format Support**: MP3, OGG, and MP4 formats for browser compatibility
- **Email-Gated Downloads**: Lead generation through free meditation samples
- **Interactive Controls**: Progress tracking, volume control, and playback features
- **Mobile Optimization**: Touch-friendly interface on all devices
- **Accessibility**: WCAG-compliant controls and keyboard navigation

### Key Pages Implemented (Completed 2025-05-24)
- **Homepage**: Complete with all sections and botanical accents
- **About Page**: Personal story, credentials, and The OM Method explanation
- **Services Page**: Service offerings, pricing, and FAQ sections

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
- **Framework**: Next.js 14 (React-based) with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom color system
- **Components**: Modular React components
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

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

### Working with Audio Files
```bash
# Convert audio files to web-friendly formats
node scripts/convert-audio.js

# Check media files status
node scripts/check-media.js
```

## Design Direction

### Visual Style
- **Color Palette**: 
  - Forest Deep: Primary brand color
  - Sage Calm: Secondary accent color
  - Living Green: Tertiary accent color
  - Ocean Breath: Complementary accent
- **Typography**: 
  - Headings: Crimson Pro (serif)
  - Body text: Inter (sans-serif)
- **Imagery**: Nature-inspired elements (botanical accents, organic shapes)
- **Layout**: Clean with ample white space and subtle gradients

### User Experience
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Optimized assets and code splitting
- **Mobile-First**: Touch-friendly interface elements
- **Navigation**: Intuitive structure focusing on courses and booking

## Project Status

### Current Progress: 65%

- ✅ Repository structure and planning completed
- ❌ Custom analytics system NOT IMPLEMENTED (0% complete)
- ✅ Project documentation and progress tracking implemented
- ✅ Platform selected: Next.js 14 with TypeScript
- ✅ Design phase completed with approved mockups
- ✅ Production-ready homepage implemented
- ✅ Audio player integration completed
- ✅ About page implementation completed
- ✅ Services page implementation completed
- 🔄 Book Session page implementation in progress
- 🔄 Contact page implementation in progress
- 🔄 Course platform page implementation planned

### Next Milestones
- **Complete Book Session Page**: May 25, 2025
- **Complete Contact Page**: May 26, 2025
- **Complete Course Platform**: May 28, 2025
- **Testing & QA**: May 29-30, 2025
- **Launch Preparation**: May 31, 2025

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

**Last Updated**: 2025-05-24
