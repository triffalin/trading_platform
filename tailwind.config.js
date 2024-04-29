/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}'
    // Add more paths here if you have other directories with Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        binance: {
          yellow: '#F3BA2F',
          black: '#12161C'
        }
      }
    }
  },
  plugins: [require('tailwindcss'), require('autoprefixer')]
};
