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
        keyframes: {
            float: {
                '0%': { transform: 'translate(0,  0px)' },
                '50%': { transform: 'translate(5px,  15px)' },
                '100%': { transform: 'translate(0,  -0px)' },
            }
        },
        animation: {
            float: 'float 5s infinite'
        }
    },
  },
  plugins: [],
}
