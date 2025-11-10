/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-animate') // if you are using tw-animate-css
  ],
}
