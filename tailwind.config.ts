import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        accent: {
          DEFAULT: "#2563EB", // Синий неон напрямую
        },
        card: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(37,99,235,0.5)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
