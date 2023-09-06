/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, tsx, ts, html, css}","./src/Pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'loginClimate': 'url(C:/Users/chuaz/OneDrive/Desktop/Coding/congressionalapp/src/images/trade and environmental sustainability.jpg)',
        'burningEarth': 'url(C:/Users/chuaz/OneDrive/Desktop/Coding/congressionalapp/src/images/giphy.gif)'
      },
      colors: {
        'loginColor': '#1e293b'
      }
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'serif': ['Georgia', 'Cambria'],
      'mono': ['SFMono-Regular', 'Menlo'],
      'display': ['Oswald'],
      'body': ['Open Sans'],
      'poppins': ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}

