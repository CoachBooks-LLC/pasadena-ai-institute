import type { Config } from "tailwindcss";

/**
 * Pasadena AI Institute brand tokens.
 * Palette: deep ink/navy primary + warm amber/gold accent + off-white canvas,
 * with San Gabriel / Craftsman-warm neutrals. See marketing/BRAND.md.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — deep ink/navy (San Gabriel night sky)
        ink: {
          DEFAULT: "#0f1b2d",
          50: "#f3f5f8",
          100: "#e4e9f0",
          200: "#c5d0de",
          300: "#9aabc4",
          400: "#677fa3",
          500: "#456089",
          600: "#344c6f",
          700: "#2a3c59",
          800: "#1b2840",
          900: "#0f1b2d",
          950: "#08101d",
        },
        // Accent — warm amber/gold (Rose Bowl sunset, Craftsman brass)
        amber: {
          DEFAULT: "#d99232",
          50: "#fdf8ef",
          100: "#f9ecd2",
          200: "#f2d59f",
          300: "#ebbb6b",
          400: "#e3a247",
          500: "#d99232",
          600: "#bd7222",
          700: "#9c551f",
          800: "#7f4420",
          900: "#69391d",
        },
        // Secondary warm — terracotta / rose (Pasadena rose)
        rose: {
          DEFAULT: "#b5523f",
          100: "#f6e2dd",
          300: "#dba293",
          500: "#b5523f",
          700: "#8a3a2c",
        },
        // Canvas neutrals — warm off-white
        canvas: {
          DEFAULT: "#faf7f1",
          soft: "#f4efe5",
          muted: "#ece5d6",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,27,45,0.04), 0 8px 24px rgba(15,27,45,0.08)",
        lift: "0 4px 12px rgba(15,27,45,0.08), 0 24px 48px rgba(15,27,45,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
