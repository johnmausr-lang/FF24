import type { Config } from "tailwindcss";

const config: Config = {
  // ВАЖНО: Добавлены точные пути к вашим компонентам
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/sections/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "hsl(var(--accent-DEFAULT))",
        },
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
      },
      boxShadow: {
        'neon': '0 0 20px rgba(37, 99, 235, 0.4)',
        'neon-sm': '0 0 15px rgba(37, 99, 235, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
