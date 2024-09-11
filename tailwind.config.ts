// Конфигурация Tailwind (цвета и плагины)

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@mossoft/ui-kit/**/*.js',
  ],
  theme: {
    colors: {
      "primary": "#2c79e8",
      "gray": "#f5f4fa",
      "gray-dark": "#00000080",
      "danger": "#FE4845",
      "success": "#39CD3F",
      yellow: "#FFCA7C",
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "Centro": "var(--font-Centro)",
        "Agora": "var(--font-Agora)",
      },
    },
    screens: {
      xs: "480px",
      sm: "600px",
      md: "900px",
      lg: "1023px",
      xl: "1200px",
      "2xl": "1440px",
    },
  },
  plugins: [
    // @ts-ignore
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    // @ts-ignore
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* IE and Edge */
          "-ms-overflow-style": "none",
          /* Firefox */
          "scrollbar-width": "none",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
    require('tailwind-scrollbar'),
  ],
};
export default config;
