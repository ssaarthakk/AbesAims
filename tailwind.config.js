/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, TS, and TSX files in the app folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all JS, JSX, and TSX files in the components folder]
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
        'primary': '#2563eb',
        'primary-dark': '#1d4ed8',
        'secondary': '#7c3aed',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
        'light': '#f8fafc',
        'dark': '#0f172a',
        'gray-100': '#f1f5f9',
        'gray-200': '#e2e8f0',
        'gray-300': '#cbd5e1',
        'gray-400': '#94a3b8',
        'gray-500': '#64748b',
        'gray-600': '#475569',
        'gray-700': '#334155',
        'gray-800': '#1e293b',
        'gray-900': '#0f172a',
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        montserratBold: ['Montserrat-Bold'],
        montserratExtraBold: ['Montserrat-ExtraBold'],
        montserratMedium: ['Montserrat-Medium'],
        montserratSemiBold: ['Montserrat-SemiBold'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}