# OrlaMarieCoach - Design Foundation & Mood Board
**Created:** May 22, 2025  
**Status:** ✅ **COMPLETE** - Ready for wireframe development  
**Phase:** Design Foundation Development

---

## 🎨 **DESIGN PHILOSOPHY**

### **Core Concept: Nature-Inspired Minimalism**
A clean, mindful design that connects users to nature while maintaining professional credibility. The design should evoke the feeling of being in a peaceful Irish countryside setting while providing clear pathways to meditation and mindfulness services.

### **Emotional Goals**
- **Calm & Peaceful**: Visual elements that reduce stress and promote tranquility
- **Authentic & Trustworthy**: Professional yet approachable, avoiding corporate coldness  
- **Grounded & Natural**: Connection to Irish heritage and natural environments
- **Spacious & Breathable**: Mental space for contemplation and clarity
- **Accessible & Inclusive**: Welcoming to all meditation experience levels

---

## 🌈 **COLOR PALETTE**

### **Primary Colors**
- **Forest Deep** (`#2d5a27`) - Primary brand color, navigation, CTAs
- **Sage Calm** (`#4a7c59`) - Secondary actions, hover states
- **Living Green** (`#7fb069`) - Accent color, success states, highlights

### **Supporting Colors**  
- **Ocean Breath** (`#5a9bb5`) - Links, informational elements, calm accents
- **Earth Warmth** (`#d4a574`) - Irish heritage touches, warm highlights
- **Pure Light** (`#f8fffe`) - Primary background, card backgrounds

### **Neutral Grays**
- **Deep Text** (`#2c3e50`) - Primary text color
- **Medium Text** (`#5a7c5a`) - Secondary text, descriptions
- **Light Border** (`#e8f5f0`) - Borders, dividers, subtle elements

### **Color Usage Guidelines**
- **Backgrounds**: Use Pure Light with subtle gradients to Earth/Ocean tones
- **Text**: High contrast combinations for accessibility (WCAG AA compliance)
- **CTAs**: Forest Deep with white text, Sage Calm for hover states
- **Accents**: Living Green sparingly for important highlights

---

## ✏️ **TYPOGRAPHY SYSTEM**

### **Primary Font: Inter (Sans-Serif)**
- **Usage**: Body text, navigation, forms, UI elements
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Characteristics**: Modern, highly legible, professional, accessible
- **Implementation**: Google Fonts CDN or self-hosted for performance

### **Secondary Font: Crimson Pro (Serif)**
- **Usage**: Major headings, emotional content, testimonials, quotes
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold)
- **Characteristics**: Elegant, warm, sophisticated, readable
- **Implementation**: Used selectively for impact and hierarchy

### **Typography Scale**
```css
/* Headings - Crimson Pro */
H1: 3.0rem (48px) - font-weight: 400 - line-height: 1.2
H2: 2.2rem (35px) - font-weight: 400 - line-height: 1.3  
H3: 1.8rem (29px) - font-weight: 500 - line-height: 1.4
H4: 1.4rem (22px) - font-weight: 500 - line-height: 1.4

/* Body Text - Inter */
Large: 1.2rem (19px) - font-weight: 400 - line-height: 1.6
Regular: 1.0rem (16px) - font-weight: 400 - line-height: 1.6
Small: 0.9rem (14px) - font-weight: 400 - line-height: 1.5
Caption: 0.8rem (13px) - font-weight: 300 - line-height: 1.4
```

### **Responsive Typography**
- **Mobile**: Reduce heading sizes by 20-30%
- **Tablet**: Reduce heading sizes by 10-15%
- **Desktop**: Full scale as defined above

---

## 🎯 **UI ELEMENT SPECIFICATIONS**

### **Buttons**
```css
/* Primary CTA Button */
.btn-primary {
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%);
  color: white;
  padding: 14px 28px;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(45, 90, 39, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #2d5a27;
  border: 2px solid #2d5a27;
  padding: 12px 26px;
  border-radius: 50px;
  font-weight: 500;
}

.btn-secondary:hover {
  background: #2d5a27;
  color: white;
}
```

### **Cards & Containers**
- **Border Radius**: 15-20px for soft, approachable feel
- **Shadow**: `0 8px 32px rgba(0, 0, 0, 0.05)` - subtle elevation
- **Background**: Pure Light with 90% opacity for layering
- **Padding**: 2.5rem (40px) for spacious feel

### **Forms**
- **Input Fields**: Soft borders, generous padding, focus states in Living Green
- **Labels**: Inter Medium weight, positioned above inputs
- **Validation**: Living Green for success, warm red-orange for errors

---

## 🌿 **IMAGERY & ICONOGRAPHY**

### **Photography Style**
- **Professional Portraits**: Natural lighting, outdoor or softly lit indoor settings
- **Backgrounds**: Irish countryside, soft nature scenes, meditation spaces
- **Mood**: Calm, authentic, professional but not corporate
- **Treatment**: Slightly desaturated to match color palette

### **Icon System**
- **Style**: Outline icons with 2px stroke weight
- **Size**: 24px standard, 32px for headers, 16px for inline
- **Color**: Deep Text for default, Forest Deep for active states
- **Source**: Lucide React (already available) or custom SVG

### **Nature Elements**
- **Subtle Textures**: Organic patterns, leaf motifs (used sparingly)
- **Background Elements**: Soft geometric shapes inspired by nature
- **Decorative Elements**: Small leaf or branch graphics for section breaks

---

## 📱 **RESPONSIVE BREAKPOINTS**

### **Mobile First Approach**
```css
/* Mobile */
Base: 320px - 767px

/* Tablet */
md: 768px - 1023px  

/* Desktop */
lg: 1024px - 1439px

/* Large Desktop */
xl: 1440px+
```

### **Grid System**
- **Container Max-Width**: 1200px
- **Grid Columns**: 12-column flexible grid
- **Gutters**: 1.5rem (24px) mobile, 2rem (32px) desktop
- **Margins**: 1rem (16px) mobile, 2rem (32px) desktop

---

## 🎭 **ANIMATION & INTERACTIONS**

### **Animation Principles**
- **Subtle & Calm**: No jarring or fast animations that break meditative state
- **Purpose-Driven**: Animations should guide attention, not distract
- **Performance**: CSS transforms preferred, 60fps target
- **Accessibility**: Respect `prefers-reduced-motion`

### **Interaction States**
```css
/* Hover Transitions */
transition: all 0.3s ease;

/* Micro-interactions */
.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale:hover {
  transform: scale(1.02);
}

/* Loading States */
.loading {
  opacity: 0.7;
  pointer-events: none;
}
```

---

## 🏗️ **LAYOUT PHILOSOPHY**

### **Content Structure**
- **Progressive Disclosure**: Information revealed in digestible chunks
- **Visual Hierarchy**: Clear importance levels through size, color, spacing
- **Whitespace**: Generous spacing for breathing room and focus
- **Alignment**: Consistent grid alignment for visual harmony

### **Navigation Approach**
- **Journey-Based**: Navigation reflects personal growth journey
- **Sticky Header**: Minimal, accessible navigation always available
- **Breadcrumbs**: Clear path indication for deeper content
- **Mobile Menu**: Slide-out drawer with organized sections

### **Content Blocks**
- **Hero Sections**: Full-width, centered content with nature backgrounds
- **Feature Sections**: 2-3 column layouts with icons and descriptions
- **Testimonials**: Card-based layout with photos and quotes
- **Course Listings**: Grid layout with preview images and key details

---

## ✅ **ACCESSIBILITY STANDARDS**

### **WCAG 2.1 AA Compliance**
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Alt Text**: Descriptive alt text for all images
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Semantic HTML and ARIA labels where needed

### **Performance Targets**
- **Page Load**: <3 seconds on 3G connection
- **First Paint**: <1.5 seconds
- **Lighthouse Score**: >90 for Performance, Accessibility, SEO
- **Analytics Impact**: <100ms additional load time

---

## 🎨 **DESIGN SYSTEM IMPLEMENTATION**

### **CSS Custom Properties**
```css
:root {
  /* Colors */
  --color-forest-deep: #2d5a27;
  --color-sage-calm: #4a7c59;
  --color-living-green: #7fb069;
  --color-ocean-breath: #5a9bb5;
  --color-earth-warmth: #d4a574;
  --color-pure-light: #f8fffe;
  
  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Crimson Pro', serif;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 15px;
  --radius-lg: 20px;
  --radius-full: 50px;
  
  /* Shadows */
  --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 8px 32px rgba(0, 0, 0, 0.05);
  --shadow-lg: 0 8px 25px rgba(45, 90, 39, 0.3);
}
```

---

## 📋 **NEXT STEPS**

### **Immediate Actions** (Ready to Start)
1. **✅ Mood Board Complete** - Visual direction established
2. **🔄 Wireframe Development** - Layout structures for key pages  
3. **🔄 Component Library** - Reusable UI elements in code
4. **🔄 Design Mockups** - High-fidelity visual designs

### **Dependencies**
- **Content from Orla**: Course details, photos, testimonials (Expected May 25)
- **Brand Voice Finalization**: Based on client content review
- **Technical Integration**: Booking system styling requirements

### **Success Metrics**
- ✅ Professional, trustworthy appearance
- ✅ Nature-inspired calm aesthetic  
- ✅ Mobile-first responsive design
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Performance optimization ready

---

**Status:** ✅ **DESIGN FOUNDATION COMPLETE**  
**Next Phase:** Wireframe Development & Component Creation  
**Timeline:** Ready to proceed with development while awaiting client content
