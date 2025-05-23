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
        'forest-deep': '#2d5a27',
        'sage-calm': '#4a7c59',
        'living-green': '#7fb069',
        'ocean-breath': '#5a9bb5',
        'earth-warmth': '#d4a574',
        'pure-light': '#f8fffe',
        'deep-text': '#2c3e50',
        'medium-text': '#5a7c5a',
        'light-border': '#e8f5f0',
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
