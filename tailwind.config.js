/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,ts,jsx}",
    "./components/**/*.{js,ts,jsx}",
    "./screens/**/*.{js,ts,jsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        light_gray: "#F2F2F2",
        light_purple: "#F0E9F9",
        light_button_purple: "#B59DD0",
        button_purple: "#9F5DD8",
        navy_blue: "#2960A1",
      },
      fontFamily: {
        nunitoExtraLight: ["Nunito_200ExtraLight", "sans-serif"],
        nunitoLight: ["Nunito_300Light", "sans-serif"],
        nunitoRegular: ["Nunito_400Regular", "sans-serif"],
        nunitoMedium: ["Nunito_500Medium", "sans-serif"],
        nunitoSemiBold: ["Nunito_600SemiBold", "sans-serif"],
        nunitoBold: ["Nunito_700Bold", "sans-serif"],
        nunitoExtraBold: ["Nunito_800ExtraBold", "sans-serif"],
        nunitoBlack: ["Nunito_900Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
