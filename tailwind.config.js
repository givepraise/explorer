/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "helvetica-neue": ["HelveticaNeue", "system-ui"],
      },
      colors: {
        themecolor: {
          1: "#FF33A7",
          2: "#FF0A95",
          3: "#E1007F",
          4: "#B80068",
          5: "#8F0051",
        },
        "themecolor-alt": {
          1: "#564148",
          2: "#BDA5AC",
          3: "#946F00",
          4: "#D0A200",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
