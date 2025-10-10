# Design Tokens and UI Guidelines

This document captures the project’s core visual language for consistency and speed.

## Colors
- Forest Deep `#2d5a27` (brand primary, dark)
- Sage Calm `#4a7c59` (brand secondary)
- Living Green `#7fb069` (accent)
- Ocean Breath `#5a9bb5` (accent)
- Earth Warmth `#d4a574` (accent)
- Pure Light `#f8fffe` (background)
- Deep Text `#2c3e50` (body text)
- Medium Text `#5a7c5a` (muted text)
- Light Border `#e8f5f0` (dividers)

Usage
- Primary actions: gradients from Forest Deep → Sage Calm
- Text on light: Deep Text (body), Medium Text (supporting)
- Text on dark: white with ~90% opacity for a soft tone
- Dividers: Light Border

## Typography
- Headings: Crimson Pro via `font-crimson`
- Body: Inter via `font-inter`

Scale (guideline)
- H1: 32–48px depending on page hero
- H2: 28–36px for section headings
- H3: 20–24px for card/feature headings
- Lead: 18–20px for intro paragraphs

Utilities (available)
- `.heading-1`, `.heading-2`, `.heading-3`
- `.text-lead`, `.text-muted`
- `.on-dark`, `.on-dark-muted`

## Spacing & Layout
- Section padding: `py-12 md:py-16` (via `Section`)
- Container width: `max-w-7xl` with `px-4 lg:px-8` (via `Container`)
- Card padding: `p-6` default, `p-8` for emphasis

## Radii & Shadows
- Radius: `rounded-xl` (15–20px) for cards and surfaces
- Shadows: subtle by default, elevate CTAs on hover

## Components
- Button variants: `primary` (gradient), `secondary` (white/outline), `ghost` (transparent)
- Structural helpers: `Container`, `Section`, `Divider`
- Motion: `.fade-in-up` for gentle reveals; prefer subtle, infrequent use

## Accessibility
- Contrast: ensure 4.5:1 for body text, 3:1 for large headings
- Focus: visible focus rings (buttons implement `focus-visible` ring)
- Landmarks: header/main/footer present on all pages

## Do/Don’t
- Do: alternate very soft backgrounds for long pages for rhythm
- Do: keep animations gentle (< 600ms) and reduce motion overall
- Don’t: mix more than two simultaneous animations per viewport

