import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from "unplugin-auto-import/vite";
import path from "path";

export default defineConfig(async () => {
  const UnoCss = await import('unocss/vite').then(i => i.default)

  return {
    plugins: [
      uni(),
      // 配置 UnoCSS
      UnoCss(),
      AutoImport({
        imports: ["vue", "uni-app"], // 自动导入 Vue 和 UniApp 的 API
        dts: "src/types/auto-imports.d.ts", // 自动生成类型声明文件
        eslintrc: {
          enabled: true, // 生成 ESLint 配置文件
          filepath: './.eslintrc-auto-import.json', // ESLint 配置文件路径
        },
      })
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
      ],
    },
    server: {
      https: false, // 启用 HTTPS
      host: '0.0.0.0', // 设置开发服务器的 host
      port: 5000, // 设置开发服务器的端口
      proxy: {
        '/wanhua': {
          target: 'https://wanhua5.sxjzlwxh.com/', // 目标服务器
          // target: 'http://101.55.21.220:1828/', // 目标服务器
          // target: 'https://wanhuawymy1.irpdg.com/', // 目标服务器
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/wanhua/, '') // 可选：重写路径
        }
      }
    },
    build: {
      sourcemap: true
    }
  }
})
