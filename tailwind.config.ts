import type { Config } from "tailwindcss";

const config: Config = {
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
        "conveyor-flow": "conveyor-flow 20s linear infinite",
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
        "conveyor-flow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "3xl": "60px",
        "4xl": "80px",
      },
      // Добавлено для управления трансформациями из JS
      transformOrigin: {
        'left-center': '0% 50%',
      }
    },
  },
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
  plugins: [require("tailwindcss-animate")],
};
import type { Config } from "tailwind.config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-lime": "#E0FF64",
      },
      animation: {
        'glitch-scan': 'glitch-scan 0.6s ease-in-out infinite',
        'border-flow': 'border-flow 4s linear infinite',
      },
      keyframes: {
        'glitch-scan': {
          '0%': { top: '-100%' },
          '100%': { top: '200%' },
        },
        'border-flow': {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '200% 50%' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
export default config;
