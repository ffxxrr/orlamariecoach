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
        'footer-moss': '#1E3A2F',      // Dark velvet green - Footer background
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
        'fade-in': 'fadeIn 0.3s ease-out',
        // Mobile hero effects
        'ken-burns': 'kenBurns 25s ease-in-out infinite',
        'ken-burns-slow': 'kenBurnsSlow 30s ease-in-out infinite',
        'breathe': 'breathe 6s ease-in-out infinite',
        'light-drift': 'lightDrift 12s ease-in-out infinite',
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
        fadeIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        // Mobile hero effects
        kenBurns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.1) translate(-2%, -1%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        kenBurnsSlow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '0.35' },
        },
        lightDrift: {
          '0%': { transform: 'translateX(-5%) rotate(0deg)', opacity: '0.03' },
          '50%': { transform: 'translateX(5%) rotate(2deg)', opacity: '0.08' },
          '100%': { transform: 'translateX(-5%) rotate(0deg)', opacity: '0.03' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
