import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Core brand colors - vibrant and fresh
          black: '#0A0A0A',        // Pure black, NO brown undertones
          mango: '#E8A33C',        // Warm mango gold - for CTAs and action
          mangoLight: '#F4B95A',   // Lighter mango
          mangoDark: '#C4872E',    // Deeper mango
          gold: '#D4A84B',         // Secondary warmth
          offWhite: '#FAF9F7',
          cream: '#FFF8E7',
          // Sophisticated forest green - professional and authoritative
          leaf: '#2F5F4F',         // Forest green - professional primary
          leafLight: '#3D7360',    // Light forest for hovers
          leafDark: '#1F3F2F',     // Dark forest for depth
          // Deep forest for dark sections
          forest: '#1B4332',       // Creates depth without muddiness
          navy: '#1B4332',         // Alias for forest
          charcoal: '#0F0F0F',     // Deep dark
          // Legacy aliases for compatibility
          teal: '#2F5F4F',
          tealLight: '#3D7360',
          tealDark: '#1F3F2F',
          accent: '#2F5F4F',
          accentLight: '#3D7360',
          accentDark: '#1F3F2F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['Lora', 'Georgia', 'serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      fontSize: {
        // Display sizes for hero headlines
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1320px',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 4px 25px -5px rgba(0, 0, 0, 0.05)',
        'glow-mango': '0 0 30px -5px rgba(232, 163, 60, 0.3)',
        'glow-leaf': '0 0 30px -5px rgba(47, 95, 79, 0.25)',
        'lift': '0 10px 40px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'lift-lg': '0 20px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, #0A0A0A 0%, #1B4332 100%)',
        'hero-dark': 'linear-gradient(180deg, #0A0A0A 0%, #0F0F0F 100%)',
        'cta-gradient': 'linear-gradient(135deg, #1B4332 0%, #2F5F4F 100%)',
        'accent-bar': 'linear-gradient(90deg, #2F5F4F 0%, #E8A33C 50%, #2F5F4F 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
        'forest-emerald': 'linear-gradient(135deg, #1B4332 0%, #2F5F4F 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [forms],
};
