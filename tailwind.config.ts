import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [  // ← КЛЮЧЕВОЕ ДОБАВЛЕНИЕ!
    {
      pattern: /(bg|text|border|shadow)-accent-DEFAULT/,
    },
    {
      pattern: /rounded-(xl|2xl|3xl|4rem)/,
    },
    {
      pattern: /animate-(pulse|ping|bounce)/,
    },
    'shadow-neon',
    'shadow-neon-sm',
    'text-glow',
    'backdrop-blur-xl',
    // Добавь другие, если нужно (например, 'group-hover:*')
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "hsl(var(--accent-DEFAULT))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
      },
      boxShadow: {
        'neon': '0 0 20px rgba(37, 99, 235, 0.4), 0 0 40px rgba(37, 99, 235, 0.1)',
        'neon-sm': '0 0 15px rgba(37, 99, 235, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
