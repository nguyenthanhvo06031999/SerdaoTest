module.exports = {
  root: true,
  extends: ['@react-native', 'eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
  plugins: ['react', 'react-native'],
  env: {
    browser: true,
    node: true,
    es6: true,
    'react-native/react-native': true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'object-curly-spacing': ['error', 'always'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
