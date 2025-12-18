import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-accent-blue",
    "text-accent-blue",
    "border-accent-blue",
    "bg-accent-lime",
    "text-accent-lime",
    "border-accent-lime",
    "shadow-neon",
    "shadow-neon-lime",
    "shadow-neon-sm",
    "glow-pulse",
    "glow-pulse-lime",
    "gradient-text",
    "gradient-border",
    "gradient-border-thick",
    "animate-pulse",
    "animate-ping",
    "animate-bounce",
    "backdrop-blur-xl",
    { pattern: /rounded-(xl|2xl|3xl|[2-4]rem)/ },
    { pattern: /(bg|text|border|shadow)-(accent-blue|accent-lime)/ },
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
      boxShadow: {
        neon: "0 0 20px rgba(37, 99, 235, 0.4), 0 0 40px rgba(37, 99, 235, 0.1)",
        "neon-lime": "0 0 20px rgba(224, 255, 100, 0.4), 0 0 40px rgba(224, 255, 100, 0.2)",
        "neon-sm": "0 0 15px rgba(37, 99, 235, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
