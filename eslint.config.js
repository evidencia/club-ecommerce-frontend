import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginImport from 'eslint-plugin-import'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    plugins: {
      react: eslintPluginReact,
      import: eslintPluginImport
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
    }
  }
]
