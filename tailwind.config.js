/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F6E0E3",
          light: "#FBF1F2",
          soft: "#F8E7E9",
          accent: "#D9BFC2",
          dark: "#B89B9E",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          off: "#FAF9F7",
          subtle: "#F4F2EE",
        },
        text: {
          main: "#181516",
          muted: "#807779",
          light: "#A39C9E",
        },
        border: {
          subtle: "#E9E2E3",
          dark: "#181516",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        logo: ["Bodoni Moda", "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
        mega: "0.35em",
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(246, 224, 227, 0.25)",
        elevated: "0 10px 30px -5px rgba(24, 21, 22, 0.08)",
      },
    },
  },
  plugins: [],
};
