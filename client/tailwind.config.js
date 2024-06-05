/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.draggable': {
          '-webkit-app-region': 'drag',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],}