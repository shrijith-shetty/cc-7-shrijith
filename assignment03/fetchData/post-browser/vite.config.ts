import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5173,
    open: !process.env.CI,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
