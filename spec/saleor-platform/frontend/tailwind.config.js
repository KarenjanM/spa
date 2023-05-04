/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "src/pages/**/*.tsx",
    "src/components/**/*.tsx"
  ],
  theme: {
    extend: {
      animation: {
        "fade" : "transition-opacity duration-200 ease-in-out"
      },
    },
  },
  plugins: [],
}
