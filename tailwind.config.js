/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,jsx,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        brass: "#b99a45",
        darkkhaki: "#c7ae6a",
        tan: "#d5c28f",
        cookiesandcream: "#e3d6b4",
        eerieblack: "#1a1a1a",
        mineshaft: "#3d3d3d",
      },
      backgroundImage: {
        "main-img":
          "url('/src/assets/andrew-kliatskyi-Wd92ZV15x-E-unsplash.jpg')",
        "modal-img": "url('/src/assets/modal-bg.jpg')",
      },
    },
  },
  plugins: [],
};
