
module.exports = {
  parser: 'babel-eslint',
  extends: ['@drewster/eslint-config/react', '@drewster/eslint-config/ts', 'plugin:jest/recommended'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0
  }
}
