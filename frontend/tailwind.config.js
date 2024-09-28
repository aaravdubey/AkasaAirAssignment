/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "light-blue": "#edf3fc",
        "orange": "#da4723",
        "dark-orange": "#a6361a"
      }
    },
  },
  plugins: [],
}

