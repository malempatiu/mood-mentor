const eslintPluginTypescript = require('@typescript-eslint/eslint-plugin');
const eslintParserTypescript = require('@typescript-eslint/parser');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: eslintParserTypescript,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintPluginTypescript.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
  eslintConfigPrettier,
];
