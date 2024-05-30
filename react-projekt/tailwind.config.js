/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#525252',
      },
    },
  },
  variants: {
    extend : {

    },
  },
  plugins: [],
};

