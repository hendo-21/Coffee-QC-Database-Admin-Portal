import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1885, 
    strictPort: true,
    proxy: {
      '/api': {
        // 1884
        target: 'http://127.0.0.1:1884',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})