import type { Config } from "tailwindcss";

const config: Config = {
  // 1. Указываем пути ко всем файлам, чтобы Tailwind сгенерировал нужные стили
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 2. Связываем переменные из globals.css с классами Tailwind
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "hsl(var(--accent-DEFAULT))", // Наш синий неон
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
      },
      // 3. Настройка скруглений (революционный дизайн требует мягких углов)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // 4. Кастомные тени для эффекта свечения (Neon Glow)
      boxShadow: {
        'neon': '0 0 20px rgba(37, 99, 235, 0.4), 0 0 40px rgba(37, 99, 235, 0.1)',
        'neon-sm': '0 0 15px rgba(37, 99, 235, 0.2)',
      },
      // 5. Анимации для Hero и Bento Grid
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      },
      // 6. Градиенты для карточек
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  // 7. Плагины для работы анимаций (необходимы для Framer Motion и входа элементов)
  plugins: [require("tailwindcss-animate")],
};

export default config;
