/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, and TSX files in the components folder]
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'color_one': '#0f172a', // Slate 900
        'color_two': '#1e293b', // Slate 800
        'color_three': '#0f172a', // Main BG
        'color_four': '#f8fafc', // Main Text
        'color_five': '#38bdf8', // Sky 400

        // Modern Theme Palette
        'primary': '#a855f7', // Purple 500 - Vibrant primary
        'primary-content': '#ffffff',
        'secondary': '#2dd4bf', // Teal 400 - Fresh secondary
        'accent': '#f472b6', // Pink 400 - Hot pink accent

        'background': '#020617', // Slate 950 - Deepest dark
        'surface': '#1e293b', // Slate 800 - Lighter for cards
        'surface-highlight': '#334155', // Slate 700 - Hover/Active

        'success': '#34d399', // Emerald 400
        'warning': '#fbbf24', // Amber 400
        'error': '#f87171', // Red 400

        'text-main': '#f8fafc', // Slate 50
        'text-muted': '#94a3b8', // Slate 400
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