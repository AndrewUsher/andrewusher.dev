module.exports = {
  extends: ['@drewster/eslint-config/react', '@drewster/eslint-config/ts'],
  globals: {
    afterAll: true,
    afterEach: true,
    beforeAll: true,
    beforeEach: true,
    describe: true,
    expect: true,
    jest: true,
    test: true,
  },
  rules: {
    'multiline-ternary': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
}
