import type { Config } from "tailwindcss";
import baseConfig from "@designali/tailwind-config/web";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [
    ...baseConfig.content,
    "./registry/**/*.{ts,tsx}",
    "registry/**/*.{ts,tsx}",
    "content/**/*.mdx",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      animation: {
        ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",

        grid: "grid 15s linear infinite",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        ripple: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            transform: "translate(-50%, -50%) scale(0.9)",
          },
        },
        "shine-pulse": {
          "0%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          to: {
            "background-position": "0% 0%",
          },
        },
      },
    },
  },
} satisfies Config;
