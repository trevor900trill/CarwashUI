/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#265c20",
          100: "#e1eadd",
          200: "#c3d4bb",
          300: "#a6be99",
          400: "#88a877",
          500: "#6b9255",
          600: "#55773e",
          700: "#3e5b2d",
          800: "#27401c",
          900: "#11260a",
        },
        secondary: "#265c20",
        background: "#f9fff5",
        coolgrey: "#f9fafb",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("flowbite-react/tailwind")],
  flowbite: {
    theme: {
      input: {
        primary: "bg-primary hover:bg-secondary text-white",
      },
      button: {
        color: {
          primary: "bg-primary hover:bg-secondary text-white",
        },
      },
    },
  },
};
