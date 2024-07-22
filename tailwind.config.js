/** @type {import('tailwindcss').Config} */

// add material-tailwind
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // "4xl": { max: "1920px" },
      // // => @media (max-width: 1920px) { ... }

      // "3xl": { max: "1440px" },
      // // => @media (max-width: 1440px) { ... }

      // "2xl": { max: "1320px" },
      // // => @media (max-width: 1320px) { ... }

      // xl-max: { max: "1140px" },
      // // => @media (max-width: 1140px) { ... }

      // lg: { max: "960px" },
      // // => @media (max-width: 960px) { ... }

      // md: { max: "720px" },
      // // => @media (max-width: 720px) { ... }

      // sm: { max: "540px" },
      // => @media (max-width: 540px) { ... }

      '4xl-max': { max: '1920px' },
      '3xl-max': { max: '1440px' },
      '2xl-max': { max: '1320px' },
      'xl-max': { max: '1140px' },
      'lg-max': { max: '960px' },
      'md-max': { max: '720px' },
      'sm-max': { max: '540px' },
      
      '4xl-min': { min: '1921px' },
      '3xl-min': { min: '1441px' },
      '2xl-min': { min: '1321px' },
      'xl-min': { min: '1141px' },
      'lg-min': { min: '961px' },
      'md-min': { min: '721px' },
      'sm-min': { min: '541px' },
    },
    extend: {
      colors: {
        secondary: "#028854",
        "hover-secondary": "#2DCEA2",
        primary: "#0070D7",
        textColor: "#151515",
      },
    },
  },
  plugins: [],
});
