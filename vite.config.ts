// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'pages/index.html'),
        dev: resolve(__dirname, 'pages/dev/index.html'),
        dev_about: resolve(__dirname, 'pages/dev/about/index.html'),
        dev_stack: resolve(__dirname, 'pages/dev/stack/index.html'),
        sales: resolve(__dirname, 'pages/sales/index.html'),
        sales_about: resolve(__dirname, 'pages/sales/about/index.html'),
        sales_exp: resolve(__dirname, 'pages/sales/experience/index.html'),
      },
    },
  },
})
