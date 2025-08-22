/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the components folder]
    "./app/(tabs)/meditate.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'color_one': '#222831',
        'color_two': '#393E46',
        'color_three': '#000',
        'color_four': '#fff',
        'color_five': '#fff',
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        montserratBold: ['Montserrat-Bold'],
        montserratExtraBold: ['Montserrat-ExtraBold'],
        montserratMedium: ['Montserrat-Medium'],
        montserratSemiBold: ['Montserrat-SemiBold'],
      },
    },
  },
  plugins: [],
}