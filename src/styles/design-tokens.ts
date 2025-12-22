/**
 * OrlaMarieCoach Design Tokens
 * Single source of truth for the design system
 *
 * Colors approved by Orla (October 2025)
 * Typography, spacing, and animation values derived from
 * research on award-winning wellness sites.
 */

export const colors = {
  // Backgrounds
  'pure-light': '#FFFCF1',      // Cream - primary background
  'earth-warmth': '#F1CBB8',    // Warm peach - secondary bg, accents

  // Brand Colors
  'living-green': '#C9A475',    // Golden brown - primary brand
  'sage-calm': '#6E5A2F',       // Dark olive - secondary text

  // Action & Text
  'forest-deep': '#56140F',     // Deep burgundy - CTAs
  'deep-text': '#000000',       // Black - primary text
} as const;

export const colorUsage = {
  background: {
    primary: colors['pure-light'],
    secondary: colors['earth-warmth'],
  },
  text: {
    primary: colors['deep-text'],
    secondary: colors['sage-calm'],
    inverse: colors['pure-light'],
  },
  accent: {
    primary: colors['living-green'],
    cta: colors['forest-deep'],
  },
  border: {
    subtle: colors['earth-warmth'],
    emphasis: colors['living-green'],
  },
} as const;

export const typography = {
  fontFamily: {
    heading: "'Crimson Pro', Georgia, serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
  },
  fontSize: {
    hero: 'clamp(2.5rem, 5vw, 4rem)',
    h1: 'clamp(2rem, 4vw, 3rem)',
    h2: 'clamp(1.5rem, 3vw, 2rem)',
    h3: 'clamp(1.25rem, 2vw, 1.5rem)',
    body: '1.125rem',
    small: '0.875rem',
    caption: '0.75rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.6,
    relaxed: 1.8,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
  },
} as const;

export const spacing = {
  // Base unit: 4px
  px: '1px',
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px - section padding
  32: '8rem',     // 128px
} as const;

export const layout = {
  container: {
    max: '1200px',
    text: '800px',
    narrow: '600px',
  },
  section: {
    paddingY: spacing[24],
    paddingYMobile: spacing[16],
  },
  card: {
    padding: spacing[8],
    paddingMobile: spacing[6],
  },
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px - buttons, cards
  lg: '1rem',      // 16px
  full: '9999px',  // pills
} as const;

export const shadows = {
  none: 'none',
  subtle: '0 1px 3px rgba(0, 0, 0, 0.05)',
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
  warm: `0 4px 14px -3px ${colors['earth-warmth']}40`,
} as const;

export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
  // Stagger delays for sequential reveals
  stagger: {
    fast: '50ms',
    normal: '100ms',
    slow: '150ms',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  behind: -1,
  base: 0,
  elevated: 10,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;

// Tailwind-compatible color config
export const tailwindColors = {
  'pure-light': colors['pure-light'],
  'earth-warmth': colors['earth-warmth'],
  'living-green': colors['living-green'],
  'sage-calm': colors['sage-calm'],
  'forest-deep': colors['forest-deep'],
  'deep-text': colors['deep-text'],
} as const;

// CSS custom properties for runtime theming
export const cssVariables = `
:root {
  /* Colors */
  --color-pure-light: ${colors['pure-light']};
  --color-earth-warmth: ${colors['earth-warmth']};
  --color-living-green: ${colors['living-green']};
  --color-sage-calm: ${colors['sage-calm']};
  --color-forest-deep: ${colors['forest-deep']};
  --color-deep-text: ${colors['deep-text']};

  /* Typography */
  --font-heading: ${typography.fontFamily.heading};
  --font-body: ${typography.fontFamily.body};

  /* Animation */
  --duration-normal: ${animation.duration.normal};
  --duration-slow: ${animation.duration.slow};
  --ease-default: ${animation.easing.default};
  --ease-gentle: ${animation.easing.gentle};
}
`;
