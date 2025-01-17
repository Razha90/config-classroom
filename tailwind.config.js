/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Ponsel sangat kecil (320px - 374px)
        "xs-320": { max: "374px" },

        // Ponsel kecil (375px - 414px)
        "sm-375": { max: "414px" },

        // Ponsel sedang (415px - 539px)
        "md-415": { max: "539px" },

        // Ponsel lanskap atau tablet kecil (540px - 767px)
        "lg-540": { max: "767px" },

        // Tablet dan perangkat lebih besar (768px - 1023px)
        "xl-768": { max: "1023px" },

        // Desktop lebih besar (1024px dan lebih besar)
        "2xl-1024": { min: "1024px" },
      },
      borderColor: {
        accent: "var(--accent)",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        foreground: "var(--foreground)",
        background: "var(--background)",
      },
      backgroundColor: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        foreground: "var(--foreground)",
        background: "var(--background)",
      },
      fill: {
        accent: "var(--accent)",
      },
      borderColor: {
        accent: "var(--accent)",
      },
      fontFamily: {
        inter: ["Inter", "Arial"],
        josefin: ["Josefin Sans", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "marquee-back": "marquee 20s ease-in infinite alternate",
        "marquee-forward": "marquee2 20s ease-in infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
