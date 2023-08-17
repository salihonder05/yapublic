/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "ya": {
          "red": "#AD3A41",
          "dark-red": "#8E2F36",
          "yellow": "#FFB62D",
          "dark-yellow": "#EB9900",
          "green": "#13B15C",
          "dark-green": "#109950",
          "white": "#FFFFFF",
          "dark-white-1": "#F0F0F0",
          "dark-white-2": "#DBDBDB",
          "dark-white-3": "#C6C6C6",
          "gray": "#7A7A7A",
          "dark-gray": "#646464",
          "black": "#1F1B1C",
          "soft-black": "#2B2627",
        }
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
