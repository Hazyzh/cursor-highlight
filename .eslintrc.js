module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: [2, 'always'],
    // comma-dangle
    'comma-dangle': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 1,
  },
};
