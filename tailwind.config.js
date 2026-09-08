/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f5f7f9', 100: '#e6eaf0', 200: '#c8d2de', 300: '#a0afc2', 400: '#7187a2', 500: '#546a88', 600: '#42536f', 700: '#35435a', 800: '#2d384b', 900: '#273040', 950: '#161c28' },
        accent: { 50: '#fdf8f0', 100: '#f8ebd6', 200: '#f0d3a9', 300: '#e5b471', 400: '#d79347', 500: '#c27a30', 600: '#a65d25', 700: '#874621', 800: '#6e3a21', 900: '#5a311e' },
        concrete: { 50: '#f7f7f8', 100: '#eeeef0', 200: '#d9d9dd', 300: '#b8b9bf', 400: '#91929a', 500: '#74757e', 600: '#5e5f67', 700: '#4d4d54', 800: '#424248', 900: '#3a3a3f' }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['Montserrat', 'Inter', 'sans-serif'] },
      boxShadow: { soft: '0 2px 15px -3px rgba(0,0,0,0.07)', card: '0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.05)' }
    }
  },
  plugins: []
};