/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'brand-primary': '#025157',
            'brand-secundary': '#00a19b',
            'brand-claro': '#19d3c5',
            'brand-gris': '#dfe1df'
        },
        fontFamily: {
            brand: ['Noto Sans', 'sans-serif'],
        },
    },
  },
  plugins: [],
}
