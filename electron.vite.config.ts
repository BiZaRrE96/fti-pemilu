import { resolve } from 'path'
import { externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

/*
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    publicDir: resolve(__dirname, 'public'),
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
}) */


export default {
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          auth: resolve(__dirname, 'src/preload/auth.ts'),
          index: resolve(__dirname, 'src/preload/index.ts')
        }
      }
    }
  },
  renderer: {
    publicDir: resolve(__dirname, 'public'),
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: {
          auth: resolve(__dirname, 'src/renderer/auth.html'),
          index: resolve(__dirname, 'src/renderer/index.html')
        }
      }
    }
  }
}