import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "glass",
    "glass-card",
    "glass-card-hover",
    "glass-nav",
    "btn-glass",
    "btn-glass-primary",
    "btn-neon",
    "gradient-text",
    "glow-pulse",
    "glow-pulse-lime",
    "shadow-neon-lime",
    "gradient-border",
    { pattern: /text-(accent-lime|accent-blue)/ },
    { pattern: /border-(accent-lime|accent-blue)/ },
    { pattern: /bg-(accent-lime|accent-blue)/ },
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
      },
      borderRadius: {
        "2rem": "2rem",
        "3rem": "3rem",
        "4rem": "4rem",
      },
      backdropBlur: {
        "2xl": "40px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
