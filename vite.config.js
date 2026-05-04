import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    proxy: {
      '/api/feed': {
        target: 'https://drizzywhiz.substack.com',
        changeOrigin: true,
        rewrite: () => '/feed',
      },
      '/api/lox': {
        target: 'https://lox-core-api.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/lox/, '/api'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.removeHeader('origin')
          })
        },
      },
    },
  },
})
