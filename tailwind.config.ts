import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          dark: "hsl(var(--primary-dark))",
        },
        accent: {
          blue: "hsl(var(--accent-blue))",
          lime: "hsl(var(--accent-lime))",
        },
        border: "hsl(var(--border))",
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 5s linear infinite",
        "conveyor-flow": "conveyor-flow 20s linear infinite",
        // Новые анимации для Premium дизайна
        "glitch-scan": "glitch-scan 0.8s ease-in-out infinite",
        "border-flow": "border-flow 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "conveyor-flow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Новые ключевые кадры
        "glitch-scan": {
          "0%": { top: "-100%" },
          "100%": { top: "200%" },
        },
        "border-flow": {
          "0%": { "background-position": "0% 50%" },
          "100%": { "background-position": "200% 50%" },
        }
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "60px",
        "4xl": "80px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
