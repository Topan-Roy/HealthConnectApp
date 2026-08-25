/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#EFF6FF',
          dark: '#1D4ED8',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#DC2626',
        text: {
          main: '#111827',
          secondary: '#6B7280',
        },
        bg: '#F8FAFC',
        card: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
