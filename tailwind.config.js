module.exports = {
  content: ['./app/**/*.{ts,tsx}', './remix.*.js'],
  theme: {
    fontFamily: {
      epilogue: 'Epilogue, serif',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
