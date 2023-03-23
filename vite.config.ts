import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          const match = /.+\/node_modules\/(?<vendorName>@vue|element-plus)\/.+/.exec(id)
          if (match) {
            return match.groups?.vendorName
          }
          if (/node_modules/.test(id)) {
            return 'vendor'
          }
          return 'index'
        }
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    // 自动导入 element-plus, 不用在 main.ts 中引入了
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
