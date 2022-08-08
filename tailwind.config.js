module.exports = {
  content: ['./app/**/*.{ts,tsx}', './remix.*.js'],
  theme: {
    fontFamily: {
      'merriweather-sans': 'Merriweather Sans, sans-serif',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
