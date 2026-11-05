import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? 'https://mhacsports.com/' : '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },

  server: {
    proxy: {
      '/django-admin': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (requestPath) => requestPath.replace(/^\/django-admin/, ''),
      },
    },
  },

  plugins: [vue()],

  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
}))
