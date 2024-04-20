/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        base: {
          50: "#eff5ff",
          100: "#e8eef8",
          200: "#dae0ea",
          300: "#b7bdc6",
          400: "#989ea7",
          500: "#6f757e",
          600: "#5c6169",
          700: "#3d424a",
          800: "#22272e",
          900: "#1c2128",
        },
      },
    },
  },
  plugins: [],
};
