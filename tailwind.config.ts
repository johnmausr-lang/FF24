import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/sections/**/*.{js,ts,jsx,tsx,mdx}", // ПРОВЕРЬ ЭТУ СТРОКУ
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#2563EB", // Тот самый синий неон
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
