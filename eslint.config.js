import eslintPluginImport from 'eslint-plugin-import'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    plugins: {
      import: eslintPluginImport
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'], // Aplica as regras apenas para arquivos TypeScript
        rules: {
          'import/no-unresolved': 'error',
          'import/order': 'warn',
          'react/react-in-jsx-scope': 'off'
        }
      }
    ]
  }
]
