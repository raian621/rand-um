/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'styles',
        replacement: '/src/styles',
      },
      {
        find: 'components',
        replacement: '/src/components'
      },
      {
        find: 'hooks',
        replacement: '/src/hooks'
      },
      {
        find: 'util',
        replacement: '/src/util'
      }
    ]
  },
  test: {
    coverage: {
      reporter: ['text'],
    },
  }
})
