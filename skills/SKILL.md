---
name: orla-marie-design
description: Create distinctive, calming frontend interfaces for OrlaMarieCoach - an Irish meditation and mindfulness coaching brand. Generates production-grade code with warm earthy aesthetics inspired by Irish heritage and award-winning wellness sites.
---

# OrlaMarieCoach Frontend Design Skill

This skill guides creation of frontend interfaces for Orla Marie's meditation coaching website. Every component should feel like walking through an ancient Irish forest - grounded, peaceful, warm, and timeless.

## Brand Essence

**Who:** Orla Marie - Irish meditation coach from Donegal, 30 years practice, 500+ clients
**Feeling:** Calm, grounded, authentic, aspirational, warm cottage meets ancient wisdom
**Reference:** mindfulnesspatagonia.com - warm earthy tones, generous whitespace, intimate photography
**Audience:** Women 35-55 seeking mindfulness, UK/Ireland + US Irish diaspora

## Design Direction: "Irish Roots, Global Reach"

The aesthetic is **refined earthy minimalism** - not sterile or clinical, but warm and inviting. Think:
- Morning mist over Donegal hills
- Warmth of a turf fire
- Texture of handwoven Irish linen
- Quiet of ancient standing stones

**NOT:** Bright primary colors, busy patterns, generic wellness tropes, cheesy stock photos, emojis

---

## Color System

Use these colors exclusively. They are Orla-approved (October 2025):

```css
:root {
  /* Backgrounds */
  --pure-light: #FFFCF1;      /* Cream - primary background, like aged paper */
  --earth-warmth: #F1CBB8;    /* Warm peach - secondary bg, gentle accents */

  /* Brand Colors */
  --living-green: #C9A475;    /* Golden brown - primary brand, warmth */
  --sage-calm: #6E5A2F;       /* Dark olive - secondary text, subtle emphasis */

  /* Action & Text */
  --forest-deep: #56140F;     /* Deep burgundy - CTAs, strong emphasis */
  --deep-text: #000000;       /* Black - primary text, headings */
}
```

**Usage rules:**
- `pure-light` for page backgrounds, cards
- `earth-warmth` for subtle section dividers, hover states, borders
- `living-green` for decorative accents, icons, subtle highlights
- `sage-calm` for secondary text, captions, metadata
- `forest-deep` for buttons, links, key CTAs (use sparingly)
- `deep-text` for headings, body text

**Gradients:** Subtle only. Cream to warm peach. Never harsh.

---

## Typography

**Headings:** Crimson Pro (elegant serif) - contemplative, timeless, Irish literary tradition
**Body:** Inter or similar clean sans - readable, modern, approachable

```css
font-family: 'Crimson Pro', Georgia, serif;     /* Headings */
font-family: 'Inter', system-ui, sans-serif;    /* Body */
```

**Type scale:**
- Hero: 4rem+ (bold statement, plenty of breathing room)
- H1: 2.5-3rem
- H2: 1.75-2rem
- H3: 1.25-1.5rem
- Body: 1rem-1.125rem (generous line-height: 1.6-1.8)
- Caption: 0.875rem

**Character:** Let text breathe. Wide letter-spacing on uppercase labels. Generous line-height. Never cramped.

---

## Layout Principles

### Whitespace is Sacred
Award-winning wellness sites use **generous, deliberate spacing**. Content blocks should breathe. This mirrors meditative pacing - unhurried, contemplative.

- Section padding: 6rem+ vertical
- Container max-width: 1200px (content), 800px (text-focused)
- Paragraph spacing: 1.5-2rem
- Card padding: 2rem+

### Composition
- **Asymmetric balance** - not rigidly centered, but thoughtfully weighted
- **Horizontal rhythm** - consider unconventional scroll patterns for special sections
- **Layered depth** - subtle overlaps, soft shadows, create atmosphere
- **Grid-breaking moments** - occasional elements that escape the grid feel intentional

### Mobile-First
60%+ traffic will be mobile. Design for thumb-friendly interactions, readable text without zoom, and touch-appropriate spacing.

---

## Motion & Animation

**Philosophy:** Motion should feel like a gentle breath, not a firework. Subtle, purposeful, calming.

### Principles
- Slow, deliberate transitions (300-600ms)
- Ease-out or ease-in-out curves (never linear for UI)
- Staggered reveals on scroll (100-150ms delays between elements)
- Subtle parallax on hero images (restrained, not dizzying)
- Hover states that feel responsive but gentle

### Avoid
- Bouncy/elastic animations (too playful)
- Fast, snappy transitions (too aggressive)
- Continuous looping animations (distracting)
- Heavy scroll-jacking (frustrating)

### CSS Example
```css
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Imagery Guidelines

### Photography Style
- **Warm, soft tones** - golden hour light, muted palette
- **Irish landscape** - Donegal coastline, ancient forests, standing stones, Celtic sites
- **Intimate, not commercial** - real moments, not posed stock photos
- **Nature elements** - fog, water, stone, wood, wool textures

### Treatment
- Slight warmth in color grading
- Soft edges, never harsh contrast
- Consider subtle grain overlay for texture
- Images should feel like memories, not advertisements

### Full-Screen Image Pattern (Award-Winning)
Modern wellness sites use immersive full-bleed imagery:
- Hero: 100vh with fixed or slow-parallax background
- Section dividers: full-width image bands between content
- About/Story pages: large atmospheric shots
- Image + text split: 50/50 or 60/40 compositions

Implementation:
```css
.hero-image {
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* parallax - disable on mobile */
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5));
}
```

### Placeholder Strategy
Until Orla provides photos, use:
- Soft gradients or solid colors from palette
- Abstract nature patterns
- Celtic-inspired geometric shapes
- Sora-generated imagery (see prompts below)
- Never generic stock wellness images

### Sora Prompts for Immersive Backgrounds

**Workflow:** When a component needs hero imagery or atmospheric backgrounds:
1. Suggest an appropriate Sora prompt from below (or craft a custom one)
2. Ask the user to run the prompt in Sora
3. User saves the output to `public/media/sora/` or their preferred location
4. Ask user for the file path to integrate into the component

**Example interaction:**
> "This hero section needs an immersive background. I'd suggest the 'Misty Morning' Sora prompt for the Donegal coastline vibe. Would you like to generate that? Once you have it, let me know where you saved it and I'll wire it up."

Use these prompts with Sora to generate atmospheric hero imagery that matches the brand:

**Irish Landscape - Misty Morning**
```
Slow cinematic drone shot over Donegal coastline at dawn,
soft golden light breaking through mist, ancient cliffs
meeting calm Atlantic waters, muted earthy tones of moss
green and warm browns, peaceful and contemplative mood,
no people, 4K filmic quality
```

**Celtic Standing Stones**
```
Gentle push-in on weathered standing stones in Irish meadow,
early morning fog rolling through, soft diffused light,
wild grasses swaying slowly, earth tones and sage greens,
timeless and grounded atmosphere, cinematic shallow depth
of field
```

**Forest Meditation**
```
Slow motion light rays filtering through ancient Irish
oak forest canopy, particles of dust and pollen floating
gently, warm golden hour tones, forest floor covered in
soft moss and ferns, deeply peaceful and spiritual mood,
no movement except light
```

**Cottage Warmth (Abstract)**
```
Close-up of turf fire embers glowing softly, warm orange
and deep brown tones, shallow focus with bokeh, gentle
smoke wisps rising, cozy and grounding atmosphere,
intimate and meditative
```

**Atlantic Waves (Slow)**
```
Ultra slow motion waves rolling onto rocky Irish shore,
overcast soft light, muted blues and grays with warm
undertones, meditative rhythm, foam patterns dissolving
on dark stones, calming and hypnotic
```

**Morning Dew (Macro)**
```
Extreme close-up of dewdrops on wild Irish grass at
sunrise, soft warm backlight creating gentle lens flare,
shallow depth of field, peaceful natural detail, earth
tones with touches of gold
```

**Prompt principles:**
- Always specify "slow" or "gentle" movement
- Include lighting: golden hour, diffused, soft
- Mention color tones: earthy, warm browns, muted greens, sage
- Set mood: peaceful, contemplative, grounded, timeless
- Avoid: bright colors, fast movement, people, busy scenes
- Add: "cinematic", "4K", "filmic" for quality

---

## Component Patterns

### Hero Sections
- Full-height (100vh) with immersive background image
- **Full-bleed photography** - edge to edge, no margins (award-winning pattern)
- Image treatment: slight overlay (rgba(0,0,0,0.2-0.4)) for text contrast
- Single powerful statement centered or asymmetric
- Text in `pure-light` or white for contrast against imagery
- Consider subtle Ken Burns effect (slow zoom/pan) for life
- Clear CTA below fold or centered
- Scroll indicator optional (subtle chevron or line)

### Service/Offering Cards
- Generous padding, breathing room
- Subtle border or shadow (not harsh)
- Icon or small image optional
- Clear hierarchy: title, brief description, link
- Hover: gentle lift or color shift

### Testimonials
- Large, elegant quotation marks (Crimson Pro)
- Quote text in larger font, serif
- Attribution below, smaller, sans-serif
- Consider carousel with slow auto-advance
- Soft background distinction

### CTAs & Buttons
- `forest-deep` background, `pure-light` text
- Generous padding (1rem 2rem minimum)
- Subtle rounded corners (4-8px)
- Hover: slight lighten or add warm glow
- Never aggressive, always inviting

### Forms
- Clean, minimal fields
- Soft borders, warm focus states
- Inline validation with gentle messaging
- Submit buttons follow CTA pattern

---

## Celtic Elements (Use Sparingly)

Irish heritage should be **felt, not forced**. Avoid:
- Shamrocks, leprechauns, obvious Irish clichés
- Busy Celtic knot borders everywhere

Instead, consider:
- Triskelion symbol (already in brand) as subtle accent
- Celtic knot as single decorative element, not pattern
- Standing stone / dolmen shapes as abstract forms
- Ogham-inspired geometric lines

---

## What to Avoid

### Generic Wellness Tropes
- Lotus flowers, chakra diagrams
- Purple/pink gradient backgrounds
- Stock photos of people meditating on beaches
- Mandala patterns
- "Namaste" typography

### Technical Anti-patterns
- Heavy JavaScript for simple interactions
- Web fonts for every weight/style (performance)
- Fixed backgrounds on mobile (janky)
- Autoplaying video with sound
- Aggressive pop-ups or modals

### AI-Generated Tells
- Overly symmetric layouts
- Purple/blue/teal gradients (Claude's defaults)
- Sans-serif everything
- Generic card grids with rounded corners
- Stock illustration style

---

## Implementation Notes

### Framework: Next.js 14 + Tailwind CSS
- Use Tailwind's color system with custom palette
- Leverage CSS custom properties for theming
- Server components by default, client for interactivity
- Image optimization with next/image

### Performance
- Lazy load below-fold images
- Subset fonts to needed characters
- Minimize JavaScript for animations (CSS-first)
- Consider view transitions API for page changes

### Accessibility
- Sufficient color contrast (check earth tones carefully)
- Focus states visible and consistent
- Reduced motion support (@media prefers-reduced-motion)
- Semantic HTML, proper heading hierarchy

---

## Quality Check

Before shipping any component, verify:
- [ ] Uses only approved color palette
- [ ] Typography follows system (Crimson Pro + Inter)
- [ ] Generous whitespace, nothing cramped
- [ ] Animations are subtle and purposeful
- [ ] Mobile-friendly without horizontal scroll
- [ ] No emojis anywhere
- [ ] Feels warm and grounded, not cold or clinical
- [ ] Would Orla be proud to show this to clients?

---

*This skill encodes research from award-winning wellness sites including mindfulnesspatagonia.com, Yin Mindfulness Immersion (Awwwards), Loff Wellness, and Irish heritage brand patterns. Updated December 2025.*
