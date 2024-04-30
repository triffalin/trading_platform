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
        'binance-yellow': '#FCD535',
        'hover-yellow': '#F0B90B',
        'binance-black': '#181a20',
        'text-color': '#EAECEF'
      }
    }
  },
  plugins: [require('tailwindcss'), require('autoprefixer')]
};
