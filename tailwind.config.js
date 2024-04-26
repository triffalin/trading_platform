module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
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
  plugins: []
};
