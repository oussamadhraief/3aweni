/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        tgreen: "0px 3px 10px rgba(163,200,208,1)",
        xxxl: '0px 3px 16px 5px rgba(125,125,125,0.6)',
        stylish: '0px 5px 20px 1px rgba(0,0,0,0.4)',
        form: 'rgba(0, 0, 0, 0.10) 0px 0px 4px, rgba(0, 0, 0, 0.10) 0px 2px 4px',
        modern: 'rgba(56, 56, 56, 0.23) 0px 4px 9px, rgba(56, 56, 56, 0.05) 0px 4px 8px',
        btn: 'rgba(0, 0, 0, 0.2) 0px 60px 40px -7px',
        float: '0 8px 55px 0 rgb(0 0 0 / 16%)',
        theone: "0 1px 4px rgb(146 161 176 / 15%)"
      },
      colors: {
        main_color: "#F46752",
        main_color_hover: "#f0edffa6",
        secondary_color: "#007188",
        lighter_blue: "#E5F3FF",
        beige: "#f9f5f2"

      }
    },
  },
  plugins: [],
}
