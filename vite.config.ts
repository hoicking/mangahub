import path from 'path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import viteCompression from 'vite-plugin-compression';


// import buildTime from './testplugin'


// https://vitejs.dev/config/
export default defineConfig({
  server: {

    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',    // 接口域名,接口服务器地止
        changeOrigin: true,
        rewrite: (path) =>  {
          return path.replace(/^\/api/, '')
        }
      },
    },
  },
  plugins: [react(), viteCompression()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData (source, fp) {
          if (fp.endsWith('global.scss')) return source;
          return `@import "@/global.scss"; ${source}`
        }
      }
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist', //指定输出路径（相对于 项目根目录).

    assetsDir: 'assets', // 指定生成静态资源的存放路径（相对于 build.outDir）,
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码，
    cssCodeSplit: true, //当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时一并获取。 不开启就是将css合并到一个文件
    sourcemap:  false, // 关闭源映射

    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
      }
    },


    minify: true,
  },
})
