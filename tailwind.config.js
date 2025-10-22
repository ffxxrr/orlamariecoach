/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'crimson': ['var(--font-crimson)', 'Crimson Pro', 'serif'],
      },
      colors: {
        // Orla's New Color Palette (October 2025)
        'forest-deep': '#56140F',      // Deep Brown/Burgundy - Primary dark, CTAs
        'sage-calm': '#6E5A2F',        // Dark Olive Brown - Secondary dark, text
        'living-green': '#C9A475',     // Golden Brown - Primary brand color
        'ocean-breath': '#C9A475',     // Mapped to Golden Brown for consistency
        'earth-warmth': '#F1CBB8',     // Warm Peach - Accents, highlights
        'pure-light': '#FFFCF1',       // Cream/Off-white - Backgrounds
        'deep-text': '#000000',        // Black - Primary text
        'medium-text': '#6E5A2F',      // Dark Olive Brown - Secondary text
        'light-border': '#F1CBB8',     // Warm Peach - Borders, dividers
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '4rem',
      },
      borderRadius: {
        'sm': '8px',
        'md': '15px',
        'lg': '20px',
        'full': '50px',
      },
      boxShadow: {
        'sm': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'md': '0 8px 32px rgba(0, 0, 0, 0.05)',
        'lg': '0 8px 25px rgba(45, 90, 39, 0.3)',
      },
      animation: {
        'float-leaf': 'floatLeaf 6s ease-in-out infinite',
        'float-flower': 'floatFlower 10s ease-in-out infinite',
        'sway': 'sway 15s ease-in-out infinite',
        'gentle-pulse': 'gentlePulse 6s ease-in-out infinite',
        'ripple': 'ripple 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        floatLeaf: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        floatFlower: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.05)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(3px) rotate(1deg)' },
          '75%': { transform: 'translateX(-3px) rotate(-1deg)' },
        },
        gentlePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1)', opacity: '0.1' },
          '100%': { transform: 'scale(1)', opacity: '0.3' },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
