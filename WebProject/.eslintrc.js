module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/prop-types': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-indent': [1, 4],
    'react/jsx-indent-props': [1, 4],
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'max-len': 0,
    'linebreak-style': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['node_modules/', 'src/registerServiceWorker.ts'],
};
