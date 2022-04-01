import { defineConfig, loadEnv, type UserConfig, type ConfigEnv } from 'vite';
import { resolve } from 'path';
import { configTheme } from './viteConfig/themeConfig';
import { createVitePlugins } from './viteConfig/plugin';
import { configManualChunk } from './viteConfig/rollupConfig';
import { configProxy } from './viteConfig/proxy';

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'; // node 环境下获取 传参

// https://zhuanlan.zhihu.com/p/480011754 Vue3 开发推荐插件
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  const { VITE_BASE_URL, VITE_PORT, VITE_DROP_CONSOLE } = loadEnv(mode, process.cwd()); // process.cwd() root

  return {
    base: VITE_BASE_URL, // 开发或生产环境服务的公共基础路径
    esbuild: {
      // target: 'es2015'
    },
    resolve: {
      alias: [
        { find: '~', replacement: resolve(__dirname, '') },
        { find: '@', replacement: resolve(__dirname, './src') },
        { find: '~@', replacement: resolve(__dirname, './src') }, // for '~@/styles/var.less'
        // 解决警告You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
      ],
      // 忽略.vue后缀
      // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: createVitePlugins(command),
    css: {
      postcss: {
        plugins: [
          // https://github.com/sass/dart-sass/issues/1219
          require('postcss-sass-unicode'),
          // require('autoprefixer') // 自动补齐css3前缀
          require('postcss-preset-env'),
        ],
      },
      preprocessorOptions: configTheme(),
    },
    // 定义全局常量替换方式
    define: {
      'process.env': process.env,
      BUILD_YEAR: new Date().getFullYear().toString(),
      // setting vue-i18-next
      // Suppress warning
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    server: {
      port: Number(VITE_PORT),
      open: true,
      https: protocol === 'https',
      proxy: configProxy(VITE_PORT),
    },
    // 依赖优化选项
    optimizeDeps: {
      include: [
        // '@ant-design/icons-vue',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        'dayjs/locale/zh-cn',
        'dayjs/locale/en',
      ],
      exclude: ['vue-demi'],
    },
    build: {
      target: 'es2015', // esnext modules
      assetsDir: 'static',
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false,
      // Terser 相对较慢，但大多数情况下构建后的文件体积更小。默认 ESbuild 最小化混淆更快但构建后的文件相对更大。
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE === 'true',
          drop_debugger: VITE_DROP_CONSOLE === 'true',
          passes: 2, // 默认1 值越大越耗时间
        },
      },
      brotliSize: false, // Turning off brotliSize display can slightly reduce packaging time
      chunkSizeWarningLimit: 800, // 默认500kb
      // https://rollupjs.org/guide/en/#outputmanualchunks
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: configManualChunk,
        },
      },
    },
  };
});
