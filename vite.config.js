import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // This tells Vite to make sure index.html is used as the fallback
    rollupOptions: {
      input: {
        app: './index.html', 
      },
    },
  },
})