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
      tenor: ['Tenor Sans',"sans-serif"],
      actor: ['Actor', "sans-serif"],
      anaheim: ["Anaheim", "sans-serif"],
      fjalla: ["Fjalla One", "sans-serif"],
      shoulders: ["Big Shoulders Inline Text", "sans-serif"]
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    
  }
}