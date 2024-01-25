/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fg': '#f1f1f1',
        'bg': '#1c1c1e',
        'primary': '#353535',
        'secondary': '#d8d7e4',
        'accent': '#6F34DC',
        'accent2': '#dba309',
        'accent3': '#069e16'
      },
      textColor : {
        'fg': '#f1f1f1',
        'bg': '#1c1c1e',
        'primary': '#353535',
        'secondary': '#d8d7e4',
        'accent': '#6F34DC'
      },
      fontSize: {
        '4xl': '3rem'
      }
    },
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'robm': ['"Roboto Mono"', 'sans-serif'],
      'ss': ['"Seven Segment"', '"Roboto Mono"', 'Inter', 'sans-serif']
    }
  },
  plugins: [],
}
