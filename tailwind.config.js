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
        // Modern color palette
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#5856eb',
          700: '#4f46e5',
          900: '#312e81',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#581c87',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          900: '#7f1d1d',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Legacy colors for gradual migration
        'color_one': '#312e81',
        'color_two': '#4f46e5',
        'color_three': '#6366f1',
        'color_four': '#ffffff',
        'color_five': '#ffffff',
        'color_background': '#f8fafc',
        'color_surface': '#ffffff',
        'color_text_primary': '#0f172a',
        'color_text_secondary': '#64748b',
        'color_text_muted': '#94a3b8',
        'color_border': '#e2e8f0',
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