/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'Outfit Fallback', 'Segoe UI', 'sans-serif'],
        display: ['Fraunces', 'Fraunces Fallback', 'Georgia', 'serif'],
        mono: ['"Fragment Mono"', '"Fragment Fallback"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
