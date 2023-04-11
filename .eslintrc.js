module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    '@react-native-community',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'detox', 'jest', 'flowtype'],
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'react-native/no-inline-styles': 'off',
    radix: 'off',
    semi: [2, 'always'],
    'prefer-const': [
      'warn',
      { ignoreReadBeforeAssign: false, destructuring: 'any' },
    ],
    'no-duplicate-imports': ['error', { includeExports: false }],
    '@typescript-eslint/consistent-type-imports': 'off',
    'spaced-comment': ['warn', 'never'],
  },
};
