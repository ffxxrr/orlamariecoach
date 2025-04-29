# OrlaMarie Coach Website Project Structure

This document outlines the recommended project structure for the OrlaMarie Coach website using Astro with the Astrogon theme for the public site and Flowbite components for the admin interface.

## Root Directory Structure

```
orlamarie-coach-website/
├── src/                    # Main source files
│   ├── components/         # Reusable components
│   ├── content/            # Content collections
│   ├── layouts/            # Page layouts
│   ├── pages/              # Page routes
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── astro.config.mjs        # Astro configuration
├── tailwind.config.cjs     # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Source Directory Structure

### Pages

```
src/pages/
├── index.astro             # Homepage
├── about.astro             # About page
├── services/
│   ├── index.astro         # Services listing
│   └── [slug].astro        # Dynamic service detail page
├── blog/
│   ├── index.astro         # Blog listing
│   └── [slug].astro        # Dynamic blog post page
├── testimonials.astro      # Testimonials page
├── contact.astro           # Contact page
├── booking.astro           # Booking page with Digital Samba
├── admin/
│   ├── index.astro         # Admin dashboard
│   ├── login.astro         # Admin login
│   ├── blog/               # Blog management
│   │   ├── index.astro     # Blog posts listing
│   │   ├── new.astro       # Create new post
│   │   └── [id].astro      # Edit existing post
│   ├── services/           # Services management
│   │   ├── index.astro     # Services listing
│   │   ├── new.astro       # Create new service
│   │   └── [id].astro      # Edit existing service
│   ├── testimonials/       # Testimonials management
│   │   ├── index.astro     # Testimonials listing
│   │   ├── new.astro       # Create new testimonial
│   │   └── [id].astro      # Edit existing testimonial
│   └── analytics/          # Analytics dashboard
│       ├── index.astro     # Main analytics overview
│       ├── visitors.astro  # Visitor statistics
│       └── content.astro   # Content performance
└── api/                    # API endpoints
    ├── contact.js          # Contact form submission
    ├── analytics/          # Analytics API
    │   ├── pageview.js     # Record page view
    │   └── stats.js        # Get analytics data
    ├── admin/              # Admin API endpoints
    │   ├── auth.js         # Authentication
    │   ├── blog.js         # Blog management
    │   ├── services.js     # Services management
    │   └── testimonials.js # Testimonials management
    └── webhook/            # External service webhooks
        └── digitalsamba.js # Digital Samba webhooks
```

### Components

```
src/components/
├── common/                 # Shared components
│   ├── Button.astro
│   ├── Card.astro
│   ├── Container.astro
│   ├── Heading.astro
│   └── Icon.astro
├── layout/                 # Layout components
│   ├── Footer.astro
│   ├── Header.astro
│   ├── MainLayout.astro
│   ├── AdminLayout.astro
│   └── Navbar.astro
├── home/                   # Homepage components
│   ├── Hero.astro
│   ├── FeaturedServices.astro
│   ├── TestimonialSection.astro
│   └── CallToAction.astro
├── services/               # Service components
│   ├── ServiceCard.astro
│   ├── ServicesList.astro
│   └── ServiceDetail.astro
├── blog/                   # Blog components
│   ├── BlogCard.astro
│   ├── BlogList.astro
│   ├── BlogDetail.astro
│   └── BlogSidebar.astro
├── booking/                # Booking components
│   ├── DigitalSambaWidget.astro
│   └── BookingConfirmation.astro
├── testimonials/           # Testimonial components
│   ├── TestimonialCard.astro
│   └── TestimonialCarousel.astro
└── admin/                  # Admin components
    ├── Sidebar.astro
    ├── Dashboard/
    │   ├── StatsCard.astro
    │   ├── VisitorChart.astro
    │   └── RecentContentList.astro
    ├── Blog/
    │   ├── BlogEditor.astro
    │   ├── BlogTable.astro
    │   └── CategoryManager.astro
    ├── Services/
    │   ├── ServiceEditor.astro
    │   └── ServiceTable.astro
    └── Testimonials/
        ├── TestimonialEditor.astro
        └── TestimonialTable.astro
```

### Content Collections

```
src/content/
├── config.ts               # Content collection config
├── blog/                   # Blog posts
│   ├── post-1.md
│   ├── post-2.md
│   └── ...
├── services/               # Service offerings
│   ├── career-coaching.md
│   ├── life-coaching.md
│   └── ...
└── testimonials/           # Client testimonials
    ├── testimonial-1.md
    ├── testimonial-2.md
    └── ...
```

### Layouts

```
src/layouts/
├── MainLayout.astro        # Main public layout
├── BlogLayout.astro        # Blog post layout
├── ServiceLayout.astro     # Service detail layout
└── AdminLayout.astro       # Admin dashboard layout
```

### Utilities and Helpers

```
src/utils/
├── db/                     # Database utilities
│   ├── connect.js          # MongoDB connection
│   └── models/             # Data models
│       ├── User.js
│       ├── BlogPost.js
│       ├── Service.js
│       └── Testimonial.js
├── api/                    # API utilities
│   ├── response.js         # API response helpers
│   └── middleware.js       # API middleware
├── auth/                   # Authentication utilities
│   ├── session.js          # Session management
│   └── protect.js          # Route protection
└── analytics/              # Analytics utilities
    ├── track.js            # Tracking helpers
    └── report.js           # Reporting helpers
```

## Key Implementation Notes

### Astro Islands

Identify components that need interactivity and use the appropriate client directive:

```astro
<!-- For client-side interactivity, use client directives -->
<SomeInteractiveComponent client:load />
<LazyLoadedComponent client:visible />
```

### Content Collections

Define typed content collections for blog posts, services, and testimonials:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
// Using Astro 5.7 content collections

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    image: z.string().optional(),
    category: z.string(),
    featured: z.boolean().default(false),
  }),
});

const servicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    price: z.string().optional(),
    duration: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  'blog': blogCollection,
  'services': servicesCollection,
};
```

### MongoDB Integration

Create a utility for MongoDB connection:

```javascript
// src/utils/db/connect.js
import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add MongoDB URI to .env file');
}

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve connection across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(import.meta.env.MONGODB_DB);
  return { client, db };
}
```

### Digital Samba Integration

Create a dedicated component for the booking widget:

```astro
---
// src/components/booking/DigitalSambaWidget.astro
---

<div class="w-full bg-white rounded-lg shadow p-4 min-h-[600px]">
  <div id="digital-samba-container" class="w-full h-full">
    <div class="flex items-center justify-center h-full">
      <p class="text-gray-500">Loading booking widget...</p>
    </div>
  </div>
</div>

<script>
  // Load Digital Samba widget after page load
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.src = 'https://booking.digitalsamba.com/embed.js';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = function() {
      // Initialize widget when script loads
      if (window.DigitalSambaBooking) {
        window.DigitalSambaBooking.initialize({
          container: document.getElementById('digital-samba-container'),
          providerId: import.meta.env.PUBLIC_DIGITAL_SAMBA_PROVIDER_ID,
          // Additional configuration
        });
      }
    };
  });
</script>
```

### Analytics Implementation

Create a simple page view tracking mechanism:

```astro
---
// src/layouts/MainLayout.astro
---

<html lang="en">
  <head>
    <!-- Other head content -->
  </head>
  <body>
    <slot />
    
    <script>
      // Simple analytics tracking
      async function trackPageView() {
        try {
          const data = {
            url: window.location.pathname,
            referrer: document.referrer,
            screenWidth: window.innerWidth,
            timestamp: new Date().toISOString()
          };
          
          await fetch('/api/analytics/pageview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        } catch (error) {
          console.error('Analytics error:', error);
        }
      }
      
      // Track on page load
      document.addEventListener('DOMContentLoaded', trackPageView);
    </script>
  </body>
</html>
```

This project structure provides a solid foundation for building the OrlaMarie Coach website with Astro and Flowbite. The organization promotes maintainable code, clear separation of concerns, and follows Astro best practices.