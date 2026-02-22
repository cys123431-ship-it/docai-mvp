/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ebf5ff",
          100: "#d6eaff",
          300: "#8fc1ff",
          500: "#3182f6",
          700: "#1b4f9f",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.22)",
      },
      keyframes: {
        "step-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "step-in": "step-in 260ms ease-out",
      },
    },
  },
  plugins: [],
};
