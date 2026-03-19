/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#99f6e4', // Teal-200
          DEFAULT: '#0d9488', // Teal-600
          dark: '#0f766e', // Teal-700
        },
        secondary: {
          light: '#f1f5f9', // Slate-50
          DEFAULT: '#94a3b8', // Slate-400
          dark: '#475569', // Slate-600
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
