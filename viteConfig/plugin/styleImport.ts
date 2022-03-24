/*
 * @Description: styleImport
 * @Date: 2022-03-24 15:03:07
 * @Author: LeiLiu
 */
import {
  createStyleImportPlugin,
  // AndDesignVueResolve,
} from 'vite-plugin-style-import'; // 按需加载

export function configStyleImportPlugin() {
  return createStyleImportPlugin({
    // resolves: [AndDesignVueResolve()],
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`;
        },
      },
    ],
  });
}
