import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig( {
  resolve: {
    alias: {
      '@': resolve( __dirname, 'src/main' ),
      '@shared': resolve( __dirname, 'src/shared' ),
      '@libs': resolve( __dirname, 'libs/api' ),
    },
  },
  build: {
    // Let @electron-forge/plugin-vite control outDir (defaults to .vite/build)
    lib: {
      entry: 'src/main/main.ts',
      formats: [ 'cjs' ],
      fileName: () => 'main.cjs',
    },
    rollupOptions: {
      external: [ 'electron', 'better-sqlite3' ],
    },
    minify: false,
  },
} )
