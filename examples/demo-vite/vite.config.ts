import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(() => {
  const isLocal = process.env.RCL_LOCAL === '1' || process.env.RCL_LOCAL === 'true'

  return {
    plugins: [react()],
    resolve: {
      alias: isLocal
        ? {
            // Use local source for development
            'react-chart-lite': fileURLToPath(new URL('../../src/index.ts', import.meta.url)),
            '@': fileURLToPath(new URL('../../src', import.meta.url)),
            // Ensure single React instance
            react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
            'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
            'react/jsx-runtime': fileURLToPath(new URL('./node_modules/react/jsx-runtime.js', import.meta.url)),
          }
        : {
            // Default: use installed npm package
            '@': fileURLToPath(new URL('./node_modules/react-chart-lite/dist', import.meta.url)),
            react: fileURLToPath(new URL('./node_modules/react', import.meta.url)),
            'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
            'react/jsx-runtime': fileURLToPath(new URL('./node_modules/react/jsx-runtime.js', import.meta.url)),
          },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      fs: {
        allow: ['..', '../../'],
      },
    },
  }
})
