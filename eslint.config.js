import eslintPluginImport from 'eslint-plugin-import'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      import: eslintPluginImport
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/order': 'warn'
    }
  }
]
