import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig( {
  resolve: {
    alias: {
      '@': resolve( __dirname, 'src/api' ),
      '@shared': resolve( __dirname, 'src/shared' ),
    },
  },
  build: {
    // Let @electron-forge/plugin-vite control outDir (defaults to .vite/build)
    lib: {
      entry: 'src/api/main.ts',
      formats: [ 'cjs' ],
      fileName: () => 'api.cjs',
    },
    rollupOptions: {
      external: [ 'electron' ],
    },
    minify: false,
  },
} )
