import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{ts,tsx}', './remix.*.js'],
  theme: {
    fontFamily: {
      'merriweather-sans': 'Merriweather Sans, sans-serif',
    },
  },
  plugins: [forms, typography],
} satisfies Config
