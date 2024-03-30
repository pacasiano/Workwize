/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./Frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    "@tailwindcss/forms",
  ]
}

