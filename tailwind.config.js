/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: {
          DEFAULT: "#3b82f6", // blue-500
          hover: "#2563eb", // blue-600
        },
        // Dark mode custom colors can be defined here
        dark: {
          bg: {
            primary: "#1f2937", // gray-800
            secondary: "#111827", // gray-900
            accent: "#374151", // gray-700
          },
          text: {
            primary: "#f9fafb", // gray-50
            secondary: "#e5e7eb", // gray-200
            accent: "#9ca3af", // gray-400
          },
        },
      },
    },
  },
  plugins: [],
};
