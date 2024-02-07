/** @type {import('tailwindcss').Config} */

// add material-tailwind
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    './index.html',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '3xl': {'max': '1440px'},
      // => @media (max-width: 1440px) { ... }

      '2xl': {'max': '1320px'},
      // => @media (max-width: 1320px) { ... }

      'xl': {'max': '1140px'},
      // => @media (max-width: 1140px) { ... }

      'lg': {'max': '960px'},
      // => @media (max-width: 960px) { ... }

      'md': {'max': '720px'},
      // => @media (max-width: 720px) { ... }

      'sm': {'max': '540px'},
      // => @media (max-width: 540px) { ... }
    },
    extend: {
      colors: {
        'secondary': '#2DCEA2',
        'hover-secondary': '#00C390'
      },
    },
  },
  plugins: [],
});

