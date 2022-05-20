module.exports = {
  content: ['./app/**/*.{ts,tsx}', './remix.*.js'],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
