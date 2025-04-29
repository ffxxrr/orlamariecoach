# OrlaMarie Coach Website Technical Specifications

## Overview

This document provides technical specifications for the OrlaMarie Coach website using Astro as the framework and Flowbite for UI components.

## Architecture

The OrlaMarie Coach website follows a modern architecture:
- **Framework**: Astro 5.7 with Astrogon theme for public site, Flowbite for admin interface
- **UI Components**: Flowbite components for consistent design
- **Rendering**: Static Site Generation (SSG) for most pages, Server-Side Rendering (SSR) where needed
- **Database**: MongoDB (running via Docker for local development) for flexible data storage
- **Deployment**: To be determined (Vercel, Netlify, or similar - containerized deployment likely)

## Technology Stack

### Frontend
- Astro 5.7 as the core framework
- Flowbite UI component library
- Tailwind CSS for styling (integrated with Flowbite)
- Minimal JavaScript with targeted interactivity using Astro islands
- React/Preact for interactive components when needed

### Backend/API
- Astro API endpoints for server functionality
- MongoDB with Mongoose for data modeling
- Simple authentication for admin area
- Email service integration for notifications

### Database
- MongoDB for document-based data storage
- Collections for users, bookings, blog posts, testimonials, and analytics data

### Development Environment
- Node.js 18+ runtime
- npm or pnpm for package management
- Docker and Docker Compose for local services (e.g., MongoDB)
- ESLint and Prettier for code quality
- Git for version control

## Design and UI 

### Design System
- Flowbite components as the foundation
- Tailwind CSS for responsive styling
- Custom color palette and typography system
- Consistent spacing and visual hierarchy
- Responsive design for all device sizes

### UI Implementation
- Flowbite components for both public site and admin dashboard
- Component-based architecture
- Optimized images with Astro's built-in image optimization
- Accessibility-focused interface development

## Design Patterns and Principles

- **Content-first approach** with Astro Content Collections
- **Islands Architecture** for minimal JavaScript
- **Static-first strategy** with dynamic elements only where needed
- **API Routes** for server functionality
- **Component-based UI** with Flowbite components
- **Responsive design** using Tailwind breakpoints

## Core Modules

### User Management
- Simple authentication for admin access
- User profile management
- Role-based access (admin only)

### Coach Profile
- Biography and credentials
- Service offerings display
- Testimonial showcase

### Digital Samba Integration
- Widget embedding with responsive container
- Styling customization to match site design
- Event tracking for analytics

### Content Management
- Blog post creation and editing via admin
- Media handling using Astro's assets system
- SEO optimization
- Markdown-based content with Astro Collections

### Custom Analytics
- Page view tracking
- Visitor statistics
- Traffic source analysis
- Custom dashboard using Flowbite components

## Database Collections

- `users`: Admin user information
- `coach_profile`: Coach biographical information
- `services`: Coaching service offerings
- `testimonials`: Client reviews and feedback
- `blog_posts`: Blog content
- `media`: Uploaded images and files
- `analytics`: Website visitor and usage data

## Key Non-Functional Requirements

1. **Performance**
   - Leverage Astro's built-in optimizations
   - Implement proper image optimization
   - Minimize client-side JavaScript
   - Optimize Core Web Vitals

2. **Security**
   - Secure admin authentication
   - API route protection
   - Content validation
   - MongoDB security best practices

3. **Scalability**
   - Design for content growth
   - Implement proper database indexing
   - Consider edge deployment options

4. **Maintainability**
   - Follow Astro best practices
   - Document component usage
   - Implement TypeScript for type safety
   - Consistent code style and organization

5. **Accessibility**
   - WCAG 2.1 AA compliance
   - Semantic HTML structure
   - Keyboard navigation support
   - Screen reader compatibility
