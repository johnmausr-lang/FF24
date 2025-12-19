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
    "glass-hover",
    "glass-nav",
    "btn-glass",
    "btn-glass-lime",
    "glow-lime",
    "gradient-text",
    "gradient-border",
    { pattern: /text-(accent-lime|accent-blue|white)/ },
    { pattern: /border-(accent-lime|white)/ },
    { pattern: /bg-(accent-lime|white)/ },
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          dark: "hsl(var(--primary-dark))", // #1E1B4B
        },
        accent: {
          blue: "hsl(var(--accent-blue))",   // #2563EB
          lime: "hsl(var(--accent-lime))",   // #E0FF64
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
