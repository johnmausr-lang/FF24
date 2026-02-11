import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["Fira Code", ...fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          lime: "#E0FF64",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        surgut: {
          900: "#1e3a8a",
          800: "#1e40af",
          100: "#dbeafe",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease infinite",
        "float": "float 6s ease-in-out infinite",
      },
      backdropFilter: {
        none: "none",
        blur: "blur(10px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-sm": "0 0 5px rgba(96, 165, 250, 0.5)",
        "glow-md": "0 0 20px rgba(96, 165, 250, 0.5)",
        "glow-lg": "0 0 40px rgba(96, 165, 250, 0.5)",
        "glow-lime": "0 0 20px rgba(224, 255, 100, 0.5)",
      },
      spacing: {
        "safe-top": "max(1rem, env(safe-area-inset-top))",
        "safe-bottom": "max(1rem, env(safe-area-inset-bottom))",
        "safe-left": "max(1rem, env(safe-area-inset-left))",
        "safe-right": "max(1rem, env(safe-area-inset-right))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // Дополнительные утилиты
    function ({ addUtilities, theme }: { addUtilities: any; theme: any }) {
      const newUtilities = {
        ".glass": {
          "@apply bg-white/10 backdrop-blur-md border border-white/20 rounded-lg":
            {},
        },
        ".glass-secondary": {
          "@apply bg-white/5 backdrop-blur-lg border border-white/10": {},
        },
        ".gradient-text": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-image":
            "linear-gradient(135deg, #E0FF64 0%, #60a5fa 100%)",
        },
        ".btn-glass-lime": {
          "@apply px-6 py-3 bg-accent-lime/90 backdrop-blur-md text-black font-black uppercase tracking-[0.15em] rounded-xl border border-accent-lime/50 hover:bg-accent-lime transition-all duration-200 inline-flex items-center gap-2":
            {},
        },
        ".btn-glass-secondary": {
          "@apply px-6 py-3 bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-200":
            {},
        },
      };

      addUtilities(newUtilities);
    },
  ],
};

export default config;
