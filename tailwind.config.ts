import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1E90FF",
        accent: "#FFD700",
        darkGold: "#B8860B",
        neutral: "#8D99AE",
        danger: "#D72638",
        green: "#06D6A0",
        dark: "#021526",
        light: "#fbfbfb",
      },
    },
  },
  plugins: [],
} satisfies Config;
