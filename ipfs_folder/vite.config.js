import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ipfs viewer development ke liye vite config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  }
})
