import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig( {
  server: { port:5180, strictPort:true },
  resolve: {
    alias: {
      '@': '/src/ui',
      '@assets': '/assets',
    },
  },
  plugins: [ react() ],
  build: {
    outDir: '.vite/build/ui',
  },
} )
