const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "mobile-lg": "400px",
        "mobile-md": "360px",
        "mobile-sm": "280px",
      },
      fontFamily: {
        heading: ["var(--font-roboto)", ...fontFamily.sans],
        sans: ["var(--font-nunito)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
