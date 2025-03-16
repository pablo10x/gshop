import type { Config } from "tailwindcss";
import flowbitePlugin from "flowbite/plugin";
import tailwind from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Mono", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
      },
      animation: {
        'gradient-move': 'gradientShift 30s ease infinite',
      },
      keyframes: {
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '400%': '400%',
      },
      patterns: {
        // Example: Stripes pattern
        stripes: {
          type: "stripe",
          colors: ["#d1d5db", "#1f2937"], // Light & dark gray
          size: 10, // Stripe thickness
        },
        // Example: Polka Dots pattern
        polkaDots: {
          type: "dots",
          size: 6,
          colors: ["#ffffff", "#1f2937"],
        },
        // Example: Waves pattern
        waves: {
          type: "wave",
          colors: ["#3b82f6", "#1e40af"],
          size: 20,
        },
      },
      colors: {
        // flowbite-svelte
        primary: {
          50: "#FFF5F2",
          100: "#FFF1EE",
          200: "#FFE4DE",
          300: "#FFD5CC",
          400: "#FFBCAD",
          500: "#FE795D",
          600: "#EF562F",
          700: "#EB4F27",
          800: "#CC4522",
          900: "#A5371B",
        },
      },
    },
  },
  plugins: [flowbitePlugin, tailwind],
} as Config;
