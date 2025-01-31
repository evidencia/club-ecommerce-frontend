import eslintPluginImport from 'eslint-plugin-import'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    plugins: {
      import: eslintPluginImport
    },
    ignores: [
      '**/node_modules/**', // Ignora a pasta node_modules
      '**/dist/**', // Ignora a pasta dist
      '**/build/**', // Ignora a pasta build
      '**/*.test.js', // Ignora arquivos de teste
      '**/*.spec.js' // Ignora arquivos de especificação
    ],

    files: ['*.ts', '*.tsx'], // Aplica as regras apenas para arquivos TypeScript
    rules: {
      'import/no-unresolved': 'error',
      'import/order': 'warn',
      'react/react-in-jsx-scope': 'off'
    }
  }
]
