/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lila: "#E6CBF7",
        celeste: "#B3E1F8",
        rosa: "#FFB8D9",
        ink: "#3A4A66", // azul oscuro del logo, para textos y bordes
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
