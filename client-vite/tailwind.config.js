/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "panel-header-background": "var(--panel-header-background)",
      },
    },
  },
  plugins: [require("daisyui")],
};
