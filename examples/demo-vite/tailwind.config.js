/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../src/**/*.{ts,tsx,scss}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      screens: {
        tablet: '768px',
      },
    },
  },
} 