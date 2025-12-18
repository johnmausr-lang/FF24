import type { Config } from "tailwindcss";

const config: Config = {
  // Мы заставляем Tailwind смотреть ВЕЗДЕ
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/sections/**/*.{js,ts,jsx,tsx,mdx}", // Твоя папка с Hero, Bento и т.д.
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
