import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // WorkspacePro brand palette (dark navy/gray vibe)
        brand: {
          50: "#f4f6f9",
          100: "#e4e8f0",
          200: "#c8d1e0",
          300: "#a0adc7",
          400: "#7282a8",
          500: "#52648e",
          600: "#3f4d74",
          700: "#34405f",
          800: "#2d3750",
          900: "#1e2537",
          950: "#0f1522",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "120": "30rem",
      },
    },
  },
  plugins: [],
};

export default config;
