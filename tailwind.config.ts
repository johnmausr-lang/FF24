import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Все классы с accent-DEFAULT (фон, текст, бордер, тень)
    "bg-accent-DEFAULT",
    "text-accent-DEFAULT",
    "border-accent-DEFAULT",
    "shadow-neon",
    "shadow-neon-sm",

    // Анимации, которые ты используешь
    "animate-pulse",
    "animate-ping",
    "animate-bounce",
    "animate-pulse-soft",

    // Backdrop и другие эффекты
    "backdrop-blur-xl",
    "backdrop-blur-md",

    // Закругления, которые часто "выпадают" в production
    "rounded-xl",
    "rounded-2xl",
    "rounded-3xl",
    "rounded-[2.5rem]",
    "rounded-[3rem]",
    "rounded-[4rem]",

    // Групповые ховеры (если используешь group-hover)
    {
      pattern: /group-hover:(scale|translate|opacity|bg|text|border)/,
    },

    // Любые динамические классы с accent
    {
      pattern: /(bg|text|border|shadow)-accent-DEFAULT/,
    },
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
