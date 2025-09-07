import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig( {
  server: { port:5180, strictPort:true },
  resolve: {
    alias: {
      '@': resolve( __dirname, 'src/ui' ),
      '@shared': resolve( __dirname, 'src/shared' ),
      '@assets': resolve( __dirname, 'assets' ),
    },
  },
  plugins: [ react() ],
  build: {
    outDir: '.vite/build/ui',
  },
} )
