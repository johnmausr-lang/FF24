import type { Config } from "tailwindcss";

const config: Config = {
  // Поддержка темной темы через классы (мы это настраивали в next-themes)
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Добавляем ваш фирменный цвет как "ff-lime"
        'ff-lime': '#E0FF64',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
