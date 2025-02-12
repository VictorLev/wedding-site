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
        "lightBeige": "var(--dun)",
        "darkBeige": "var(--tan)",
        "lightBlue": "var(--light-blue)",
        "midBlue": "var(--blue)",
        "darkBlue": "var(--dark-blue)",
        "charcoal": "var(--black)",
      },
    },
  },
  plugins: [],
} satisfies Config;
