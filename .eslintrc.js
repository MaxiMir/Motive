module.exports = {
  // Specifies the ESLint parser
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018,
    // Allows for the use of imports
    sourceType: 'module',
  },
  rules: {
    // Disable prop-types as we use TypeScript for type checking
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    // needed for NextJS's jsx without react import
    'react/react-in-jsx-scope': 'off',
    'no-multi-spaces': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: false,
      },
    ],
    curly: 'error',
    'brace-style': 'error',
    'no-whitespace-before-property': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': 'error',
    'comma-style': ['error', 'last'],
    'arrow-spacing': 'error',
    semi: ['error', 'never'],
    'semi-spacing': 'error',
    'key-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-trailing-spaces': 'error',
  },
  globals: { React: 'writable' },
}
