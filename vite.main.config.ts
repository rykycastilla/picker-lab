import { defineConfig } from 'vite'

export default defineConfig( {
  resolve: {
    alias: { '@': '/src/main' },
  },
  build: {
    // Let @electron-forge/plugin-vite control outDir (defaults to .vite/build)
    lib: {
      entry: 'src/main/main.ts',
      formats: [ 'cjs' ],
      fileName: () => 'main.cjs',
    },
    rollupOptions: {
      external: [ 'electron' ],
    },
    minify: false,
  },
} )
