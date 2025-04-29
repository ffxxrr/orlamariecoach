# Flowbite Integration Guide

This document provides detailed steps for setting up and using the Flowbite Astro theme for the OrlaMarie Coach website.

## Installation Options

### Option 1: Start with Flowbite Astro Admin Dashboard Template

For the quickest setup that includes both frontend and admin components:

```bash
# Create a new project using the Flowbite Astro Admin Dashboard template
npm create astro@latest -- --template flowbite/astro-admin-dashboard

# Navigate to the project directory
cd orlamarie-coach-website
```

### Option 2: Add Flowbite to Existing Astro Project

If starting with a basic Astro project:

```bash
# Create base Astro project if needed
npm create astro@latest

# Add Tailwind CSS integration
npx astro add tailwind

# Install Flowbite and Flowbite-Astro
npm install flowbite flowbite-astro
```

Update your `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    tailwind(),
  ],
});
```

Configure Tailwind in `tailwind.config.cjs`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
```

## Project Structure

When setting up your project, follow this recommended structure:

```
src/
├── components/             # Reusable components
│   ├── common/             # Common components used across the site
│   ├── public/             # Components for public-facing pages
│   └── admin/              # Components for admin dashboard
├── layouts/
│   ├── MainLayout.astro    # Layout for public pages
│   └── AdminLayout.astro   # Layout for admin pages (with authentication)
├── content/                # Content collections
│   ├── blog/               # Blog post markdown files
│   └── services/           # Service offering markdown files
├── pages/
│   ├── index.astro         # Homepage
│   ├── about.astro         # About page
│   ├── services/           # Service pages
│   ├── blog/               # Blog pages
│   ├── contact.astro       # Contact page
│   ├── booking.astro       # Booking page with Digital Samba
│   └── admin/              # Admin pages (protected)
│       ├── index.astro     # Admin dashboard
│       ├── blog/           # Blog management
│       ├── services/       # Services management
│       └── analytics/      # Analytics dashboard
└── styles/
    └── custom.css          # Custom styles beyond Flowbite
```

## Using Flowbite Components

### Basic Component Usage

Import and use Flowbite components in your Astro files:

```astro
---
import { Card, Button } from 'flowbite-astro'
---

<Card>
  <h2 class="text-2xl font-bold">Service Offering</h2>
  <p>Description of the service goes here.</p>
  <Button color="primary">Book Now</Button>
</Card>
```

### Key Components for Public Site

These Flowbite components are particularly useful for the coaching website:

1. **Navbar** - For site navigation
   ```astro
   import { Navbar } from 'flowbite-astro'
   
   <Navbar fluid={true} rounded={true}>
     <Navbar.Brand href="/">
       <img src="/logo.svg" class="mr-3 h-6 sm:h-9" alt="OrlaMarie Coach Logo" />
       <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
         OrlaMarie Coach
       </span>
     </Navbar.Brand>
     <Navbar.Toggle />
     <Navbar.Collapse>
       <Navbar.Link href="/" active={true}>Home</Navbar.Link>
       <Navbar.Link href="/services">Services</Navbar.Link>
       <Navbar.Link href="/blog">Blog</Navbar.Link>
       <Navbar.Link href="/about">About</Navbar.Link>
       <Navbar.Link href="/contact">Contact</Navbar.Link>
     </Navbar.Collapse>
   </Navbar>
   ```

2. **Hero Section** - For homepage
   ```astro
   <section class="bg-white dark:bg-gray-900">
     <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
       <div class="mr-auto place-self-center lg:col-span-7">
         <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Transform Your Life with Expert Coaching</h1>
         <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Professional coaching to help you overcome challenges and achieve your goals.</p>
         <a href="/booking" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
           Book a Session
           <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
         </a>
       </div>
       <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
         <img src="/hero-image.jpg" alt="Coaching session">
       </div>
     </div>
   </section>
   ```

3. **Testimonial Section** - For client testimonials
   ```astro
   import { Carousel } from 'flowbite-astro'
   
   <section class="bg-white dark:bg-gray-900">
     <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
       <div class="max-w-screen-md mx-auto">
         <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Client Success Stories</h2>
         <p class="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Hear from clients who have transformed their lives through coaching</p>
         
         <Carousel indicators={true}>
           <!-- Testimonial 1 -->
           <div class="flex flex-col items-center p-8">
             <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/testimonial1.jpg" alt="Client photo"/>
             <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">Sarah Johnson</h5>
             <span class="text-sm text-gray-500 dark:text-gray-400">Marketing Executive</span>
             <p class="mt-3 text-gray-500 dark:text-gray-400">"The coaching sessions with OrlaMarie have been transformative for my career. I've gained clarity, confidence, and achieved goals I thought were years away."</p>
           </div>
           
           <!-- Add more testimonials as needed -->
         </Carousel>
       </div>
     </div>
   </section>
   ```

4. **Service Cards** - For service offerings
   ```astro
   import { Card } from 'flowbite-astro'
   
   <div class="grid gap-8 lg:grid-cols-3">
     <Card imgSrc="/career-coaching.jpg" imgAlt="Career coaching">
       <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
         Career Coaching
       </h5>
       <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">
         Navigate career transitions, improve leadership skills, and achieve your professional goals.
       </p>
       <p class="font-medium text-lg mb-4">
         $150 per session
       </p>
       <p class="text-sm text-gray-500 mb-4">
         60-minute sessions
       </p>
       <a href="/booking" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
         Book Now
         <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
         </svg>
       </a>
     </Card>
     
     <!-- Add more service cards -->
   </div>
   ```

### Admin Dashboard Components

For the admin area, leverage these Flowbite dashboard components:

1. **Admin Layout** - Shared layout for admin pages
   ```astro
   ---
   // src/layouts/AdminLayout.astro
   import { Sidebar, Navbar } from 'flowbite-astro'
   import { checkAdminAuth } from '../lib/auth';
   
   // Check authentication (pseudo-code)
   const isAuthenticated = await checkAdminAuth(Astro.request);
   if (!isAuthenticated) {
     return Astro.redirect('/admin/login');
   }
   ---
   
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>OrlaMarie Coach Admin</title>
   </head>
   <body>
     <div class="flex">
       <Sidebar aria-label="Admin sidebar">
         <!-- Sidebar content here -->
       </Sidebar>
       
       <div class="w-full">
         <Navbar fluid={true}>
           <!-- Navbar content here -->
         </Navbar>
         
         <main class="p-4 md:ml-64 h-auto pt-20">
           <slot />
         </main>
       </div>
     </div>
   </body>
   </html>
   ```

2. **Analytics Dashboard** - For visitor statistics
   ```astro
   ---
   // src/pages/admin/index.astro
   import AdminLayout from '../../layouts/AdminLayout.astro';
   import { Card, Table } from 'flowbite-astro';
   ---
   
   <AdminLayout>
     <h1 class="text-2xl font-semibold mb-4">Dashboard</h1>
     
     <div class="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
       <!-- Stats cards -->
       <Card>
         <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
           Website Visitors
         </h5>
         <p class="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
         <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Last 30 days</p>
       </Card>
       
       <!-- Add more stats cards -->
     </div>
     
     <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
       <!-- Charts would go here (using chart.js or other library) -->
     </div>
     
     <div class="mb-4">
       <h2 class="text-xl font-semibold mb-2">Recent Bookings</h2>
       <Table>
         <!-- Table header and data -->
       </Table>
     </div>
   </AdminLayout>
   ```

## Digital Samba Integration

Wrap your Digital Samba booking widget in Flowbite components for a consistent look:

```astro
---
// src/pages/booking.astro
import MainLayout from '../layouts/MainLayout.astro';
import { Card } from 'flowbite-astro';
---

<MainLayout>
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-extrabold mb-6">Book Your Coaching Session</h1>
    
    <Card>
      <div id="digital-samba-container" class="min-h-[600px] w-full">
        <!-- Digital Samba widget will load here -->
        <div class="flex items-center justify-center h-full">
          <p class="text-gray-500">Loading booking widget...</p>
        </div>
      </div>
    </Card>
  </div>
</MainLayout>

<script>
  // Load Digital Samba widget
  window.addEventListener('load', function() {
    // Digital Samba integration code
    // Example (replace with actual implementation):
    // const script = document.createElement('script');
    // script.src = 'https://booking.digitalsamba.com/embed.js';
    // script.async = true;
    // document.body.appendChild(script);
    
    // Initialize widget when script loads
    // script.onload = function() {
    //   window.DigitalSambaBooking.initialize({
    //     container: document.getElementById('digital-samba-container'),
    //     providerId: 'YOUR_PROVIDER_ID'
    //   });
    // };
  });
</script>
```

## Admin Authentication

For protecting the admin area, use a simple authentication approach with Astro middleware:

1. Create an authentication middleware file:

```javascript
// src/middleware.js
export function onRequest({ request, redirect }, next) {
  const url = new URL(request.url);
  
  // Only apply to admin routes
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    // Check for authenticated session (implement this based on your auth method)
    const isAuthenticated = checkAuthSession(request);
    
    if (!isAuthenticated) {
      return redirect('/admin/login');
    }
  }
  
  return next();
}

// Example auth check function - implement based on your auth strategy
function checkAuthSession(request) {
  // Check cookie, session storage, etc.
  // Return true if authenticated, false otherwise
  return false;
}
```

2. Create a login page:

```astro
---
// src/pages/admin/login.astro
import { Alert } from 'flowbite-astro';

// Handle form submission
if (Astro.request.method === 'POST') {
  try {
    const data = await Astro.request.formData();
    const username = data.get('username');
    const password = data.get('password');
    
    // Implement authentication logic
    // If successful, redirect to admin dashboard
    // For example: return Astro.redirect('/admin');
  } catch (error) {
    console.error(error);
  }
}
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login - OrlaMarie Coach</title>
</head>
<body class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Admin Login
        </h1>
        <form class="space-y-4 md:space-y-6" method="POST">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
          </div>
          <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</body>
</html>
```

## Customizing Flowbite

To customize Flowbite's default styles:

1. Extend the Tailwind configuration in `tailwind.config.cjs`:

```javascript
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#b1c2fc',
          400: '#7694f9',
          500: '#3b66f5',
          600: '#355cdd',
          700: '#2c4db8',
          800: '#233d93',
          900: '#1d3278',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
```

2. Add custom CSS in `src/styles/custom.css`:

```css
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@500;600;700;800&display=swap');

/* Custom styles */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}

/* Additional custom styles */
```

3. Import the custom CSS in your layout:

```astro
---
// src/layouts/MainLayout.astro
import '../styles/custom.css';
---
```

## Conclusion

The Flowbite Astro theme provides all the UI components needed for both the public-facing website and admin interface. By following this setup guide, you'll create a cohesive design system that maintains consistency throughout the OrlaMarie Coach website.

Remember to use the Flowbite Admin Dashboard template as a starting point, as it includes many pre-built components that will save development time, especially for the admin interface.

Resources:
- [Flowbite Astro Documentation](https://flowbite-astro.com/)
- [Flowbite Components](https://flowbite.com/docs/components)
- [Astro Documentation](https://docs.astro.build/)