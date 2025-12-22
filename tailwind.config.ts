import type { Config } from "tailwindcss";

const config: Config = {
  // Указываем пути ко всем файлам, где используются классы Tailwind
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Брендовые цвета проекта
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
      // Настройки скруглений (используют переменные из globals.css)
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Определение анимаций
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 5s linear infinite",
        "conveyor-loop": "conveyor-loop 30s linear infinite", // Автономное движение конвейера
        "spin-slow": "spin 12s linear infinite", // Медленное вращение шестеренок
      },
      // Ключевые кадры для анимаций
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
        "conveyor-loop": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Сдвиг на 50% для бесшовности
        },
      },
      // Расширенные настройки размытия (Glassmorphism)
      backdropBlur: {
        xs: "2px",
        "3xl": "60px",
        "4xl": "80px",
      },
      // Точка трансформации для эффектов появления
      transformOrigin: {
        'left-center': '0% 50%',
      }
    },
  },
  // Safelist гарантирует, что динамически генерируемые классы не будут удалены при сборке
  safelist: [
    "blur-[20px]",
    "blur-[40px]",
    "blur-[60px]",
    "blur-[80px]",
    "blur-[100px]",
    "bg-black/20",
    "bg-black/40",
    "bg-black/60",
    "bg-black/80",
    "opacity-10",
    "opacity-15",
    "opacity-20",
    "opacity-30",
    "opacity-40",
    "opacity-50",
    "opacity-60",
    "origin-left",
  ],
  plugins: [
    require("tailwindcss-animate"), // Плагин для стандартных анимаций
    // Плагин для поддержки 3D-перспективы через утилиты
    function ({ addUtilities }: any) {
      addUtilities({
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.rotate-x-12': {
          transform: 'rotateX(12deg)',
        },
        '.rotate-x-15': {
          transform: 'rotateX(15deg)',
        },
      });
    },
  ],
};

export default config;
