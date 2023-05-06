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
        mtblack: "#0b0b0b",
        mtdarkgray: "#0e0e0e",
        mtgray: "#121212",
        mtpurple: "#6E1FD6",
        mtyellow: "#DDEA1F",
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
