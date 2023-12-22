import { fileURLToPath, URL } from 'node:url'
// @ts-ignore
import vitePluginTencentOss from 'vite-plugin-tencent-oss'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// import AutoImport from 'unplugin-auto-import/vite';
const prod = process.env.NODE_ENV === 'production'

const options = {
  region: '<Your Region>',
  secretId: '<Your Secret ID>',
  secretKey: '<Your Secret Key>',
  bucket: '<Your Bucket>',
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    prod && vitePluginTencentOss(options),
    Components({
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true,
          cjs: true,
          importStyle: false,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉请求路径中的 /api
      },
    },
    host: '0.0.0.0',
    port: 5173,
  },
})
