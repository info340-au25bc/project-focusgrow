/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nav-bg": "#c9e3c4",
        "nav-text": "#143a20",
        muted: "#e9efe6",
        "card-bg": "#d6e9d3",
        accent: "#7bb23a",
        "muted-gray": "#e6e6e6",
        "light-green": "#97d35b",
        "bg-gradient": "#fbfdf9",
      },
      //stole these colors from the og static shadow stuff
      boxShadow: {
        nav: "0 2px 6px rgba(0, 0, 0, 0.15)",
        card: "0 6px 14px rgba(15, 20, 16, 0.04)",
        "inset-plant": "inset 0 -6px 12px rgba(0, 0, 0, 0.02)",
      },
    },
  },
  plugins: [],
};
