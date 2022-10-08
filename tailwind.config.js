const { validateServiceConfig } = require('@grpc/grpc-js/build/src/service-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
  theme: {
    extend: {colors:{
      "primary": "#FF5D73",
      "secondary": "#494949",
      "accent": "#7C7A7A",
      "neutral": "#000000",
      "base-100": "#F1EBEB"
      }
    },
    fontFamily: {
      sans: ['Tenor Sans', "sans-serif"]
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    
  }
}