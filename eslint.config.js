import eslintPluginTypeScript from '@typescript-eslint/eslint-plugin'
import eslintParserTypeScript from '@typescript-eslint/parser'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  {
    ignores: ['node_modules/', 'dist/', 'public/'],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypeScript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-var-requires': 'off',
      ...eslintConfigPrettier.rules,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
]
