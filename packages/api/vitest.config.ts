import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: {
      '@common': './src/common',
      '@entities': './src/entities',
      '@repositories': './src/repositories',
      '@usecases': './src/usecases'
    }
  }
})
