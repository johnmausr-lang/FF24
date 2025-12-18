import type { Config } from "tailwindcss";

const config: Config = {
  // 1. ПУТИ: Указываем Tailwind, где искать классы, чтобы избежать 404 и отсутствия стилей
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. ЦВЕТА: Связываем переменные из вашего globals.css с классами Tailwind
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
        primary: {
          DEFAULT: "hsl(var(--primary-DEFAULT))",
        },
      },
      // 3. НЕОНОВЫЕ ЭФФЕКТЫ: Добавляем кастомные тени для "революционного" вида
      boxShadow: {
        'neon': '0 0 20px hsl(var(--accent-DEFAULT) / 0.5), 0 0 10px hsl(var(--accent-DEFAULT) / 0.3)',
        'neon-sm': '0 0 10px hsl(var(--accent-DEFAULT) / 0.4)',
      },
      // 4. АНИМАЦИИ: База для Hero-секции и Bento Grid
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // Плагин для поддержки анимаций из shadcn/ui
  plugins: [require("tailwindcss-animate")],
};

export default config;
