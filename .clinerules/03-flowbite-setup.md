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

# Install Flowbite
npm install flowbite
```
**Note:** This project uses Flowbite directly via its Tailwind plugin and JavaScript, **not** the `flowbite-astro` component library.

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

## Using Flowbite (HTML + Tailwind Classes)

Flowbite is integrated via its Tailwind CSS plugin and its necessary JavaScript file (usually included in your main layout). **This project does NOT use the `flowbite-astro` component library.** Instead, you should use standard HTML elements and apply the appropriate Flowbite utility classes for styling.

### Basic Usage with Tailwind Classes

Apply Flowbite's utility classes directly to your standard HTML elements within your `.astro` files. Refer to the official [Flowbite Documentation](https://flowbite.com/docs/getting-started/introduction/) for available components and their corresponding HTML structure and classes.

**Example: Creating a Button**

Instead of importing a component, use a standard `<a>` or `<button>` tag and apply Flowbite classes:

```astro
---
// No Flowbite component import needed
---
<a href="/contact" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
  Contact Us
</a>

<button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
  Learn More
</button>
```

### Interactive Components (JavaScript)

For components requiring JavaScript (like dropdowns, modals, carousels), ensure the Flowbite JavaScript is included in your layout (e.g., `src/layouts/MainLayout.astro` or `src/layouts/AdminLayout.astro`). Then, add the necessary `data-modal-toggle`, `data-dropdown-toggle`, etc., attributes to your HTML elements as specified in the Flowbite documentation.

```astro
---
// src/layouts/MainLayout.astro (Example of including the script)
---
<html>
  <head>...</head>
  <body>
    <slot />
    {/* Ensure Flowbite JS is loaded */}
    <script is:inline src="/node_modules/flowbite/dist/flowbite.min.js"></script>
  </body>
</html>
```

```astro
<!-- Example: Dropdown Trigger -->
<button id="dropdownButton" data-dropdown-toggle="dropdown" class="..." type="button">
  Dropdown button
  <svg>...</svg>
</button>

<!-- Dropdown menu -->
<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
      <li><a href="#" class="...">Dashboard</a></li>
      {/* ... other items */}
    </ul>
</div>
```

### Key Component Examples (HTML + Tailwind)

Refer to the official [Flowbite Components Documentation](https://flowbite.com/docs/components/) for the correct HTML structure and Tailwind classes for common UI patterns like Navbars, Hero Sections, Cards, Testimonials, etc.

**Example: Basic Card Structure** (From Flowbite Docs)

```html
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg>...</svg>
        </a>
    </div>
</div>
```
*(The previous examples using `flowbite-astro` imports were incorrect and have been removed.)*

### Admin Dashboard Components

For the admin area, continue using standard HTML elements styled with Flowbite and Tailwind classes. The Flowbite documentation provides examples for common dashboard elements like sidebars, tables, forms, and stats cards.

1. **Admin Layout Structure (Conceptual)**
   (The existing `AdminLayout.astro` already follows this principle, using HTML tags and classes).
   ```astro
   ---
   // src/layouts/AdminLayout.astro
   // No flowbite-astro imports needed here for layout structure
   import '../styles/custom.css';
   // Authentication logic...
   ---
   <!doctype html>
   <html>
   <head>...</head>
   <body class="bg-gray-50 dark:bg-gray-900">
     <div class="flex h-screen overflow-hidden">
       {/* Sidebar: Use <aside> with Flowbite classes */}
       <aside class="...">
          {/* Sidebar Header */}
          <div class="...">...</div>
          {/* Sidebar Menu: Use <nav> and <ul> with Flowbite classes */}
          <nav class="...">...</nav>
       </aside>

       {/* Content Area */}
       <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
         {/* Header: Use <header> with Flowbite classes */}
         <header class="...">...</header>

         {/* Main Content: Use <main> */}
         <main>
           <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
             <slot /> {/* Page content goes here */}
           </div>
         </main>
       </div>
     </div>
     <script is:inline src="/node_modules/flowbite/dist/flowbite.min.js"></script>
   </body>
   </html>
   ```
   *(The previous example using `flowbite-astro` imports was incorrect.)*

2. **Analytics Dashboard Example (Conceptual)**
   Use standard HTML `div`s for cards and `<table>` elements styled with Flowbite/Tailwind classes.
   ```astro
   ---
   // src/pages/admin/index.astro
   import AdminLayout from '../../layouts/AdminLayout.astro';
   // No flowbite-astro imports needed
   ---
   <AdminLayout title="Admin Dashboard">
     <h1 class="text-2xl font-semibold mb-4">Dashboard</h1>

     <div class="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
       {/* Stats Card Example (HTML + Tailwind) */}
       <div class="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
         <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
           Website Visitors
         </h5>
         <p class="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
         <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Last 30 days</p>
       </div>
       {/* Add more stats cards */}
     </div>

     {/* Charts would go here (using chart.js or other library integrated into Astro) */}

     <div class="mb-4">
       <h2 class="text-xl font-semibold mb-2">Recent Bookings</h2>
       {/* Table Example (HTML + Tailwind) */}
       <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
           <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
               <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                       <th scope="col" class="px-6 py-3">Client Name</th>
                       <th scope="col" class="px-6 py-3">Date</th>
                       <th scope="col" class="px-6 py-3">Service</th>
                   </tr>
               </thead>
               <tbody>
                   <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                       <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Jane Doe</th>
                       <td class="px-6 py-4">2024-04-28</td>
                       <td class="px-6 py-4">Career Coaching</td>
                   </tr>
                   {/* More rows */}
               </tbody>
           </table>
       </div>
     </div>
   </AdminLayout>
   ```
   *(The previous example using `flowbite-astro` Card and Table imports was incorrect.)*

## Digital Samba Integration
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

Wrap your Digital Samba booking widget in standard HTML `div` elements styled with Flowbite/Tailwind classes for a consistent look, rather than using a `flowbite-astro` Card component.

```astro
---
// src/pages/booking.astro
import MainLayout from '../layouts/MainLayout.astro';
// Removed incorrect Card import
---

<MainLayout title="Book a Session">
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-extrabold mb-6 dark:text-white">Book Your Coaching Session</h1>

    {/* Use standard div with Flowbite/Tailwind classes */}
    <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-lg border dark:border-gray-700">
      <div id="digital-samba-container" class="min-h-[600px] w-full">
        {/* Digital Samba widget will load here */}
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
// Removed incorrect Alert import

// Handle form submission
let error = null; // Example error handling variable
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
        {/* Display error messages using styled divs if needed */}
        {error && (
          <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">Login Error!</span> {error}
          </div>
        )}
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
