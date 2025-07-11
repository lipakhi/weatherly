/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // enable dark mode via `class`
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "bg-light": "#F1F5F9", // Light background
        "bg-dark": "#0F172A", // Dark background

        // Cards
        "card-light": "#FFFFFF",
        "card-dark": "#1E293B",

        // Text
        "text-light": "#1E293B",
        "text-dark": "#F8FAFC",

        // Muted Text
        "muted-light": "#64748B",
        "muted-dark": "#94A3B8",

        // Accent (e.g., buttons, pills)
        "accent-light": "#564dfad5", // Indigo-600
        "accent-dark": "#7652c5ff", // Purple-600
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
  fadeIn: {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  slideUp: {
    "0%": { opacity: 0, transform: "translateY(10px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  slideInFromLeft: {
    "0%": { opacity: 0, transform: "translateX(-40px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
  },
  subtlePop: {
    '0%': { opacity: 0, transform: 'scale(0.95) translateY(10px)' },
    '100%': { opacity: 1, transform: 'scale(1) translateY(0)' },
  },
},
animation: {
  "fade-in": "fadeIn 0.4s ease-in-out",
  "slide-up": "slideUp 0.4s ease forwards",
  "slide-in-left": "slideInFromLeft 0.5s ease-out forwards",
  'subtle-pop': 'subtlePop 0.5s ease-out forwards',
},

    },
  },
  plugins: [],
};
