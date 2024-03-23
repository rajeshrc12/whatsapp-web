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
        "poll-bar-fill-sender": "var(--poll-bar-fill-sender)",
        "poll-bar-container-sender": "var(--poll-bar-container-sender)",
        "poll-checkbox-default-border-color-sender":
          "var(--poll-checkbox-default-border-color-sender)",
        "popup-panel-background": "var(--popup-panel-background)",
      },
    },
  },
  plugins: [require("daisyui")],
};
