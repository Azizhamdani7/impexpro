import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        royal: "#163E72",
        gold: "#D4A437"
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
