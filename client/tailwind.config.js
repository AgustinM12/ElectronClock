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
        '.app-region-drag': {
          '-webkit-app-region': 'drag',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}