import js from '@eslint/js'
import { globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // Существующие правила
      'react/react-in-jsx-scope': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Добавленные правила для синтаксических ошибок
      'no-undef': 'error',
      'no-unused-vars': 'error',
      'no-extra-semi': 'error',
      'no-unreachable': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'valid-typeof': 'error',
      'no-irregular-whitespace': 'error',

      // TypeScript специфичные правила
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Правила для скобок и синтаксиса
      'brace-style': ['error', '1tbs'],
      curly: ['error', 'all'],
      'no-trailing-spaces': 'error',
      'eol-last': 'error',

      // Согласование с Prettier
      semi: ['error', 'never'], // соответствует "semi": false в .prettierrc
      quotes: ['error', 'single'], // соответствует "singleQuote": true
    },
    settings: {
      react: { version: 'detect' },
    },
  },
])
