import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "vegas-gold": "#FFC72C",
        "gold": "#FFC72C",
        "neon-magenta": "#FF00FF",
        "pink": "#FF00FF",
        "electric-cyan": "#00FFFF",
        "cyan": "#00FFFF",
        "deep-void-black": "#080808",
        "off-white": "#E0E0E0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-bebas-neue)", "var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "liquid-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
    },
  },
  plugins: [],
};
export default config;
