module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/restrict-template-expressions': 0
  }
}
