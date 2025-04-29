# Astrogon Theme Integration

This document provides guidance on using the Astrogon theme for the public-facing part of the OrlaMarie Coach website.

## Astrogon Theme Overview

Astrogon is a professional Astro theme designed for agencies, startups, and businesses. It provides a clean, modern design that's well-suited for a coaching website. The theme is available at [astro.build/themes/details/astrogon/](https://astro.build/themes/details/astrogon/).

## Key Features

- Modern, clean design with professional aesthetics
- Responsive layout that works well on all devices
- Blog functionality built-in
- Service showcase sections
- Team/about sections ideal for coach profiles
- Contact forms
- Performance optimized

## Implementation Approach

### 1. Starting with Astrogon

To begin implementation with Astrogon:

```bash
# Clone the Astrogon theme
git clone https://github.com/StaticMania/astrogon

# Change to the project directory
cd astrogon

# Install dependencies
npm install
```

### 2. Customization Areas

When adapting Astrogon for the OrlaMarie Coach website, focus on these key customization areas:

- **Brand Colors**: Update the color scheme in the Tailwind configuration
- **Typography**: Adjust font selections to match the coaching brand
- **Hero Section**: Replace with coaching-specific imagery and messaging
- **Services Section**: Adapt for coaching services
- **About Section**: Customize for coach biography and credentials
- **Testimonials**: Implement for client success stories
- **Blog**: Utilize for coaching content and resources
- **Contact**: Customize the contact form
- **Booking Integration**: Add Digital Samba widget integration (not included in theme)

### 3. Folder Structure

The Astrogon theme follows a standard Astro structure that we'll maintain:

```
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other assets
│   ├── components/  # UI components
│   ├── content/     # Content collections
│   ├── layouts/     # Page layouts
│   ├── pages/       # Page routes
│   └── styles/      # Global styles
```

## Integration with Admin Interface

Since we're using Flowbite for the admin interface, we'll need to:

1. Keep the public site using Astrogon theme
2. Create a separate admin area with Flowbite components
3. Ensure consistent data handling between both sections

Implementation steps:

1. Build the public site first using Astrogon
2. Add the admin section with Flowbite components
3. Create shared data models for both interfaces

## Extending Astrogon

We'll need to extend Astrogon with these custom components:

1. **Digital Samba Integration**
   - Create a booking page template
   - Implement the widget container
   - Style to match Astrogon's design language

2. **Custom Analytics**
   - Add tracking script that matches Astrogon's performance standards
   - Ensure it works with Astrogon's routing

3. **MongoDB Content Integration**
   - Connect Astrogon's content areas to MongoDB
   - Implement dynamic content loading

## Theme Customization Guidelines

When customizing Astrogon:

1. Preserve the theme's responsive behavior
2. Maintain accessibility standards
3. Keep the performance optimizations
4. Follow the theme's design patterns when adding new components
5. Use the theme's CSS variables for consistency

## Next Steps

1. Install the Astrogon theme
2. Review its structure and components
3. Create a customization plan for OrlaMarie Coach specific needs
4. Begin with the home page customization
5. Progressively adapt other page templates