/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#092034",
        secondary: "#537895",
        paragraph: "#A1A1AA",
        cardBlue: "#6E64EF",
        cardGreen: "#9AE266",
        cardOrange: "#F3B059",
        cardDarkRed: "#987681",
        hookYellow: "#ffb45c",
      },
      screens: {},
    },
  },
  plugins: [],
};
