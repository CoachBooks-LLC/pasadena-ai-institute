import type { Config } from "tailwindcss";

/**
 * Pasadena AI Institute — "gallery" design system.
 * Near-monochrome chrome (cool charcoal ink on true near-white gallery wall);
 * all saturated color comes from real impressionist artwork. One sparing accent:
 * a deep Monet pond teal. See DESIGN.md.
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
        // gallery wall surfaces (legacy `canvas` name kept, remapped)
        canvas: {
          DEFAULT: "#fbfbf9",
          soft: "#f4f4f1",
          muted: "#ececea",
        },
        bg: "#fbfbf9",
        surface: "#ffffff",
        // cool charcoal ink ramp (neutralized — no more warm navy)
        ink: {
          DEFAULT: "#1c1c1f",
          50: "#f5f5f6",
          100: "#e9e9eb",
          200: "#d6d6d9",
          300: "#b6b6bb",
          400: "#8c8c92",
          500: "#6e6e74",
          600: "#54545a",
          700: "#3c3c41",
          800: "#2a2a2e",
          900: "#1c1c1f",
          950: "#141416",
        },
        // single accent — deep Monet pond teal (legacy `amber` name kept, remapped)
        amber: {
          DEFAULT: "#2f6f74",
          50: "#eef4f4",
          100: "#d7e6e6",
          200: "#aaccce",
          300: "#7fb1b3",
          400: "#4f9296",
          500: "#2f6f74",
          600: "#285e62",
          700: "#214d50",
          800: "#1b3e41",
          900: "#163133",
        },
        accent: {
          DEFAULT: "#2f6f74",
          soft: "#3a8a90",
        },
        // kept for error states only
        rose: {
          DEFAULT: "#b5523f",
          100: "#f6e2dd",
          300: "#dba293",
          500: "#b5523f",
          700: "#8a3a2c",
        },
      },
      fontFamily: {
        display: ["var(--font-serif)", "Didot", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Didot", "Georgia", "serif"],
        sans: [
          "var(--font-body)",
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
        // gallery: shadows are whisper-soft; structure comes from hairlines
        card: "0 1px 2px rgba(20,20,22,0.03), 0 12px 32px -16px rgba(20,20,22,0.12)",
        lift: "0 2px 6px rgba(20,20,22,0.05), 0 30px 60px -24px rgba(20,20,22,0.20)",
      },
      borderRadius: {
        xl2: "0.5rem",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.02) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.05) translate3d(-0.8%,-0.8%,0)" },
        },
        nudge: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(7px)", opacity: "1" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "ken-burns": "ken-burns 24s ease-out both",
        nudge: "nudge 1.9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
