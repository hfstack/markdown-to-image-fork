import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineConfig({
  plugins: [react()],
  esbuild: {
    pure: ['console.log'],
    drop: ['debugger'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
  },
})
