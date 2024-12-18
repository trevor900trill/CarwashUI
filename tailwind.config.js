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
  // aec9cd
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4da6c1",
          100: "#eaf6f9", // Very light blue
          200: "#cde8ef", // Lighter blue
          300: "#89d1de", // Soft aqua
          400: "#56c2c8", // Vibrant aqua
          500: "#4da6c1", // Logo base
          600: "#3b8da4", // Deeper teal
          700: "#2c6e84", // Muted teal
          800: "#1f515e", // Dark blue-gray
          900: "#12323f", // Deep navy
        },
        secondary: "#06222f", // Deep blue
        background: "#eaf6f9",
        coolgrey: "#06222f",
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
