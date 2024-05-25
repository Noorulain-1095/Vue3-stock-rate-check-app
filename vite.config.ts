import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: { 
    port: 3000,
    watch: {
      usePolling: true, // Enable polling to watch for file changes
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
