import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          mango: '#F4A300',
          gold: '#C78A00',
          offWhite: '#F9F7F4',
          teal: '#0F6E63',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          lg: '1024px',
          xl: '1200px',
          '2xl': '1320px',
        },
      },
    },
  },
  plugins: [forms],
};
