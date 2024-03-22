/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "panel-header-background": "var(--panel-header-background)",
        "panel-background-deeper": "var(--panel-background-deeper)",
        "outgoing-background": "var(--outgoing-background)",
        "chevron-button-background": "var(--chevron-button-background)",
        "quick-action-button-background":
          "var(--quick-action-button-background)",
      },
    },
  },
  plugins: [require("daisyui")],
};
