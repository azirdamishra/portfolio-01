import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// REPLACE "yourname" below with your actual Substack username
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  server: {
    proxy: {
      '/api/feed': {
        target: 'https://drizzywhiz.substack.com',
        changeOrigin: true,
        rewrite: (path) => '/feed',
      },
    },
  },
})
