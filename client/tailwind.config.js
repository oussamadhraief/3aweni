module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        tgreen: "0px 3px 10px rgba(163,200,208,1)",
        xxxl: "0px 3px 16px 5px rgba(125,125,125,0.6)",
        stylish: "0px 5px 20px 1px rgba(0,0,0,0.4)",
        form: "rgba(0, 0, 0, 0.10) 0px 0px 4px, rgba(0, 0, 0, 0.10) 0px 2px 4px",
        modern:
          "rgba(56, 56, 56, 0.23) 0px 4px 9px, rgba(56, 56, 56, 0.05) 0px 4px 8px",
        btn: "rgba(0, 0, 0, 0.2) 0px 60px 40px -7px",
        float: "0 8px 55px 0 rgb(0 0 0 / 16%)",
        theone: "0 1px 4px rgb(146 161 176 / 15%)",
      },
      colors: {
        primary: "#F46752",
        lighter_primary: "#ffe8e4",
        secondary: "#007188",
        lighter_blue: "#E5F3FF",
        beige: "#f9f5f2",
        light_gray: "#b0bec5",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#F46752",

          secondary: "#007188",

          accent: "#1FB2A5",

          neutral: "#191D24",

          "base-100": "#fff",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
