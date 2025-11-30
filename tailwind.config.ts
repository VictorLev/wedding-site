import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-in forwards",
        kenburns: "kenburns 20s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        kenburns: {
          "0%": {
            transform: "scale(1) translate(0, 0)",
            opacity: "0",
          },
          "5%": {
            opacity: "1",
          },
          "95%": {
            opacity: "1",
          },
          "100%": {
            transform: "scale(1.15) translate(-2%, -1%)",
            opacity: "1",
          },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "paleBlue": "var(--pale-blue)",
        "lightBlue": "var(--light-blue)",
        "mediumBlue": "var(--medium-blue)",
        "blue": "var(--blue)",
        "darkBlue": "var(--dark-blue)",
        "darkerBlue": "var(--darker-blue)",
        "charcoal": "var(--charcoal)",
      },
      maxHeight: {
        'screen': '100vh',
      },
    },
  },
  plugins: [],
} satisfies Config;
