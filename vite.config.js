import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
                charset: (atRule) => {
                    if (atRule.name === 'charset') {
                        atRule.remove()
                    }
                }
            }
        }
    ],
    server: {
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://996gg.xyz/api',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/img':{
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://996gg.xyz/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/img/, '')
            }
        },
        host: '0.0.0.0',
        port: '8080',
        strictPort: true
    },
    resolve: {
        extensions: [".js", ".vue"],
        alias: {
            '@': join(__dirname, 'src')
        }
    },
    build:{
        minify:"terser",
        terserOptions: {
            /**
             * command 用来判断环境
             */
            compress: {
                drop_console: true,
            }
        }
    }
})
