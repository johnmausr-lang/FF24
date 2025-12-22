import type { Config } from "tailwindcss";

const config: Config = {
  // Указываем пути ко всем файлам проекта
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 5s linear infinite",
        "conveyor-loop": "conveyor-loop 40s linear infinite", // Плавное движение ленты
        "spin-slow": "spin 12s linear infinite", // Вращение технических элементов
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
        "conveyor-loop": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Важно для бесшовности
        },
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "60px",
        "4xl": "80px",
      },
    },
  },
  // Safelist предотвращает удаление динамических классов при сборке
  safelist: [
    "blur-[20px]", "blur-[40px]", "blur-[60px]", "blur-[80px]", "blur-[100px]",
    "bg-black/20", "bg-black/40", "bg-black/60", "bg-black/80",
    "opacity-10", "opacity-15", "opacity-20", "opacity-30", "opacity-40", "opacity-50", "opacity-60",
  ],
  plugins: [
    require("tailwindcss-animate"),
    // Добавляем поддержку 3D перспективы и поворотов
    function ({ addUtilities }: any) {
      addUtilities({
        '.perspective-3000': {
          perspective: '3000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.rotate-x-25': {
          transform: 'rotateX(25deg)',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      });
    },
  ],
};

export default config;
