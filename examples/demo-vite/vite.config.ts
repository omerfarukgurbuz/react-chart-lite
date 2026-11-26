import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(() => {
  const isLocal = process.env.RCL_LOCAL === '1' || process.env.RCL_LOCAL === 'true'

  return {
    plugins: [react()],
    // Keep built assets portable when hosted under a repository subpath.
    base: './',
    resolve: {
      alias: [
        ...(isLocal ? [{
          find: 'react-chart-lite',
          replacement: fileURLToPath(new URL('../../src/index.ts', import.meta.url)),
        }] : []),
        {
          find: '@',
          replacement: fileURLToPath(new URL(
            isLocal ? '../../src' : './node_modules/react-chart-lite/dist',
            import.meta.url,
          )),
        },
        // Resolve React (including subpaths) from the demo in both modes.
        { find: 'react', replacement: fileURLToPath(new URL('./node_modules/react', import.meta.url)) },
        { find: 'react-dom', replacement: fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)) },
      ],
      dedupe: ['react', 'react-dom'],
    },
    server: {
      fs: {
        allow: ['..', '../../'],
      },
    },
  }
})
