/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'xll': '8rem',
      },
      colors: {
        mtblack: "#2D2727",
        mtdarkgray: "#342a35",
        mtgray: "#413543",
        mtpurple: "#8F43EE",
        mtyellow: "#F0EB8D",
        mtwhite: "#fff"
      },
      padding: {
        '1.2': '0.3rem',
      },
      margin: {
        '5.5': '1.375rem',
      },
    },
  },
  plugins: [],
}
