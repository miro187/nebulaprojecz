/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'space': 'space 20s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      colors: {
        nebula: {
          900: '#000814',
          800: '#001233',
          700: '#001845',
          600: '#002855',
          500: '#023E7D',
          400: '#0353A4',
          300: '#0466C8',
          200: '#0477D9',
          100: '#048BF0',
        }
      }
    },
  },
  plugins: [],
};