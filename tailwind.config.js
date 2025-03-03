/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"], // ✅ Vérifie bien ce chemin
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
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
