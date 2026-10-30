import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const buildDate = process.env.CP_BUILD_DATE || new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date())

export default defineConfig({
  plugins: [react()],
  define: { __BUILD_DATE__: JSON.stringify(buildDate) },
  build: {
    outDir: 'dist',
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    manifest: true,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/src/components/') || id.includes('/src/lib/') || id.includes('/src/data/') || id.includes('/src/context/') || id.includes('/src/hooks/')) {
            return 'shared'
          }
        },
      },
    },
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
})
