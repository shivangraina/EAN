const { off } = require('./app/models/tags');

module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['prettier', 'airbnb-base'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    indent: 'off',
  },
};
