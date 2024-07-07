/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tmdb-dark-blue': '#202938',
        'tmdb-blue': '#01b4e4',
        'tmdb-green': '#90cea1',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
    }
  },
  plugins: [],
}
