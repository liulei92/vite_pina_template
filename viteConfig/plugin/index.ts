/*
 * @Description: plugin
 * @Date: 2022-03-24 14:50:35
 * @Author: LeiLiu
 */
import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configHtmlPlugin } from './html';
import { configAutoRegistryComponents } from './component';
import { configAutoImportDeps } from './autoImport';
import { configStyleImportPlugin } from './styleImport';
import { configSvgIconsPlugin } from './svgIcons';
import { configMockPlugin } from './mock';
import { configLegacyPlugin } from './legacy';
import { configCompressPlugin } from './compress';
import { configVisualizerPlugin } from './analysis';

// 参考 https://github.com/JS-banana/vite-vue3-ts
export function createVitePlugins(command: 'build' | 'serve') {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    configHtmlPlugin(), // 注入环境变量到html模板中
    configAutoRegistryComponents(), // 自动按需引入组件
    configAutoImportDeps(), // 自动按需引入依赖
    configStyleImportPlugin(), // 按需加载
    configSvgIconsPlugin(), // 注入icons
    configMockPlugin(),
    // 自动按需引入依赖
    // lodash-es 按需引入
  ];
  if (command === 'build') {
    vitePlugins.push(configLegacyPlugin()); // legacy 兼容
    vitePlugins.push(configCompressPlugin()); // gzip
    vitePlugins.push(configVisualizerPlugin()); // 分析
  }

  return vitePlugins.filter(Boolean);
}
