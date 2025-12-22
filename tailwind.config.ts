import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}", // Убедись, что путь к твоим секциям указан верно
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Добавили кастомные анимации для видео-подложек
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shine: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      // Настройка блюра для экстремального стекла
      backdropBlur: {
        xs: "2px",
        "3xl": "60px",
        "4xl": "80px",
      },
    },
  },
  // Добавляем safelist, чтобы Tailwind не удалял наши динамические классы стекла
  safelist: [
    "blur-[40px]",
    "blur-[60px]",
    "blur-[80px]",
    "bg-black/20",
    "bg-black/40",
    "bg-black/60",
    "opacity-30",
    "opacity-40",
    "opacity-50",
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
