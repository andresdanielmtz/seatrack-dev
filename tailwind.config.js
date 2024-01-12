/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "persian-blue": {
          50: "#eef3ff",
          100: "#e1e8fe",
          200: "#c8d5fd",
          300: "#a7b8fa",
          400: "#8392f6",
          500: "#666cee",
          600: "#3f3be0",
          700: "#403bc7",
          800: "#3532a1",
          900: "#2f2f80",
          950: "#1e1c4a",
        },
      },
    },
  },
  plugins: [],
};
