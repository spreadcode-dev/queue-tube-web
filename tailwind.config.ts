import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
        },
        background: {
          dark:    "var(--color-background-dark)",
          0:       "var(--color-background-0)",
          50:      "var(--color-background-50)",
          800:     "var(--color-background-800)",
          error:   "var(--color-background-error)",
          success: "var(--color-background-success)",
          info:    "var(--color-background-info)",
        },
        secondary: {
          0:   "var(--color-secondary-0)",
          400: "var(--color-secondary-400)",
        },
        typography: {
          0:   "var(--color-typography-0)",
          400: "var(--color-typography-400)",
          600: "var(--color-typography-600)",
          900: "var(--color-typography-900)",
        },
        outline: {
          100: "var(--color-outline-100)",
          300: "var(--color-outline-300)",
        },
        error: {
          400: "var(--color-error-400)",
        },
        success: {
          500: "var(--color-success-500)",
        },
        info: {
          400: "var(--color-info-400)",
        },
        warning: {
          500: "var(--color-warning-500)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
