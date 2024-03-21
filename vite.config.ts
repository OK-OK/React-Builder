import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: info => {
          const folderName = info.name.includes('.css') ? 'css' : 'assets'
          return `${folderName}/[name]-[hash][extname]`
        },
        chunkFileNames: info => {
          const lastPath = info.moduleIds.at(-1)
          const pathList = lastPath.split('/')
          return `${
            pathList.includes('src') ? `modules/${pathList.at(-2)}` : 'vendor'
          }/[name]-[hash].js`
        },
        manualChunks: id => {
          if (id.includes('node_modules')) {
            const nameList = id.split('/')
            const index = nameList.findIndex(n => n === 'node_modules')
            if (index !== -1) {
              return nameList[index + 1]
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
