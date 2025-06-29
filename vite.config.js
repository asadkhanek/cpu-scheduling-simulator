import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cpu-scheduling-simulator/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
