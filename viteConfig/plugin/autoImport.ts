/*
 * @Description: autoImport
 * @Date: 2022-03-24 15:09:40
 * @Author: LeiLiu
 */
import AutoImport from 'unplugin-auto-import/vite';

export const configAutoImportDeps = () =>
  AutoImport({
    // targets to transform
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    // custom
    // {
    //   '@vueuse/core': [
    //     // named imports
    //     'useMouse', // import { useMouse } from '@vueuse/core',
    //     // alias
    //     ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
    //   ],
    //   'axios': [
    //     // default imports
    //     ['default', 'axios'] // import { default as axios } from 'axios',
    //   ],
    //   '[package-name]': [
    //     '[import-names]',
    //     // alias
    //     ['[from]', '[alias]']
    //   ]
    // }
    imports: [
      'vue',
      'vue-router',
      'pinia',
      'vue-i18n',
      {
        '@vueuse/core': [
          'useDebounceFn',
          'useEventListener',
          'useResizeObserver',
          'useIntervalFn',
          'useTimeoutFn',
        ],
        '@vueuse/head': ['useHead'],
        // https://www.lodashjs.com/docs/lodash.omitBy
        'lodash-es': ['deepMerge', 'cloneDeep', 'omit', 'pick', 'toArray'],
        'ant-design-vue/es': ['message', 'Modal', 'notification'],
      },
    ],
    dts: 'src/auto-imports.d.ts',

    // custom resolvers
    // 可以在这自定义自己的东西，比如接口api的引入，工具函数等等
    // see https://github.com/antfu/unplugin-auto-import/pull/23/
    resolvers: [
      /* ... */
    ],
  });
