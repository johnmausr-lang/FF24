import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        accent: "rgb(var(--accent))",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
}

export default config
