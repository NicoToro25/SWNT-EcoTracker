/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        dark: {
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'body': ['1em', { lineHeight: '1.55' }],
        'body-lg': ['1.1em', { lineHeight: '1.5' }],
        'lead': ['1.2em', { lineHeight: '1.45' }],
        'title': ['1.45em', { lineHeight: '1.3' }],
        'title-lg': ['1.75em', { lineHeight: '1.25' }],
        'display': ['2.1em', { lineHeight: '1.2' }],
        'display-lg': ['2.5em', { lineHeight: '1.15' }],
      },
    },
  },
  plugins: [],
};
