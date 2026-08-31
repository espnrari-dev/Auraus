/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        primary: '#0d9488',
        secondary: '#f59e0b',
        dark: { bg: '#0f172a', card: '#1e293b', text: '#e2e8f0' },
        light: { bg: '#f8fafc', card: '#ffffff', text: '#0f172a' },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
