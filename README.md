# Vue 3 + Typescript + Vite

> This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs]([https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)) to learn more.

<a name="b02bc574"></a>
## 1. Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
<a name="e844a966"></a>
## 2. Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

<a name="bdfe6ac0"></a>
## 3. use "Pina" in Ts

- [https://www.jianshu.com/p/3526548c1169](https://www.jianshu.com/p/3526548c1169)
- [https://segmentfault.com/a/1190000040368602](https://segmentfault.com/a/1190000040368602)

<a name="DTvuS"></a>
## 4. Vite.config.ts
```shell
配置变量

export const API_PREFIX = '/api'; // prefix

// serve
export const API_BASE_URL = '/api';
export const API_TARGET_URL = 'http://localhost:3003';

// mock
export const MOCK_API_BASE_URL = '/mock/api';
export const MOCK_API_TARGET_URL = 'http://localhost:3003';

export const APP_MODEL = 'XXXX';

export const ANALY = false; // 分析

export const FIT = '12'; // 代码适配 1 是否开启legacy 2 是否开启gzip

export const LOCAL_MOCK = true; // 是否开启mock
export const PROD_MOCK = false;

```
<a name="sSgdw"></a>
### 4.1 resolove
```shell
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
}
```
<a name="S9Di9"></a>
### 4.2 plugins
> 封装 createVitePlugins
> plugins: createVitePlugins(command),

```shell
// 参考 https://github.com/JS-banana/vite-vue3-ts
// 参考 https://juejin.cn/post/7062648728405934087
// 参考 https://juejin.cn/post/7006640791539941407#heading-37
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

    PkgConfig(),
    OptimizationPersist(), // 使用按需引入插件后:  PkgConfig 和 OptimizationPersist 启动优化
  ];
  if (command === 'build') {
    vitePlugins.push(configLegacyPlugin()); // legacy 兼容
    vitePlugins.push(configCompressPlugin()); // gzip
    vitePlugins.push(configVisualizerPlugin()); // 分析
  }

  return vitePlugins.filter(Boolean);
}
```
<a name="JcftY"></a>
#### 4.2.1 configHtmlPlugin
```shell
import { createHtmlPlugin } from 'vite-plugin-html'; // https://github.com/anncwb/vite-plugin-html
import { APP_MODEL } from '../constant';

/**
 *  注入环境变量到html模板中
 *  如在  .env文件中有环境变量  APP_MODEL=admin
 *  则在 html模板中  可以这样获取  <%- APP_MODEL %>
 *  文档： https://github.com/anncwb/vite-plugin-html
 */
export function configHtmlPlugin() {
  return createHtmlPlugin({
    inject: {
      data: { APP_MODEL },
    },
    minify: true,
  });
}
```
<a name="vBuQv"></a>
#### 4.2.1 configAutoRegistryComponents
```shell
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export const configAutoRegistryComponents = () => {
  return Components({
    // relative paths to the directory to search for components.
    dirs: ['src/components'],

    // valid file extensions for components.
    extensions: ['vue', 'tsx'],
    // search for subdirectories
    deep: true,
    // resolvers for custom components
    resolvers: [AntDesignVueResolver({ importStyle: 'less' })],

    // generate `components.d.ts` global declarations,
    // also accepts a path for custom filename
    // dts: false,
    dts: 'src/components.d.ts',

    // Allow subdirectories as namespace prefix for components.
    directoryAsNamespace: false,
    // Subdirectory paths for ignoring namespace prefixes
    // works when `directoryAsNamespace: true`
    globalNamespaces: [],

    // auto import for directives
    // default: `true` for Vue 3, `false` for Vue 2
    // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
    // To install Babel, run: `npm install -D @babel/parser @babel/traverse`
    directives: true,

    // filters for transforming targets
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
  });
};
```
<a name="Tp8M7"></a>
#### 4.2.1 configAutoImportDeps
```shell
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
        '@vueuse/core': [],
        'lodash-es': ['deepMerge'],
        'ant-design-vue': ['Modal', 'message', 'notification'],
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
```
<a name="ry0lQ"></a>
#### 4.2.1 configStyleImportPlugin
```shell
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

注：configStyleImportPlugin 和 configAutoRegistryComponents中的resolvers: [AntDesignVueResolver({ importStyle: 'less' })]搭配使用。
configAutoRegistryComponents 按需加载组件
configStyleImportPlugin负责引入按需加载组件的css

```
<a name="VBtva"></a>
#### 4.2.1 configSvgIconsPlugin
```shell
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

/**
 *  把src/icons 下的所有svg 自动加载到body下，供组件使用
 *  类似于webpack中的svg-sprite-loader
 *  文档：https://github.com/anncwb/vite-plugin-svg-icons
 */
export function configSvgIconsPlugin() {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: '[name]', // demo icon-[dir]-[name]
  });
}
```
<a name="rQ3Mj"></a>
#### 4.2.1 configMockPlugin
```shell
import { viteMockServe } from 'vite-plugin-mock';
import { LOCAL_MOCK, PROD_MOCK } from '../constant';

export function configMockPlugin() {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: LOCAL_MOCK,
    prodEnabled: PROD_MOCK, // 为了演示，线上开启 mock，实际开发请关闭，会影响打包体积
    // 开发环境无需关心
    // injectCode 只受prodEnabled影响
    // https://github.com/anncwb/vite-plugin-mock/issues/9
    // 下面这段代码会被注入 main.ts
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
 
       setupProdMockServer();
       `,
  });
}

注：mock 需搭配 根目录下的mock文件夹和server的proxy使用

mock/_createProdMockServe.ts

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules = import.meta.globEager('./**/*.ts');

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) return;
  mockModules.push(...mockModules[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
```

<a name="otFhK"></a>
### 4.3 css
```shell
css: {
  postcss: {
    plugins: [
      // https://github.com/sass/dart-sass/issues/1219
      require('postcss-sass-unicode'),
      // require('autoprefixer') // 自动补齐css3前缀
      require('postcss-preset-env'),
    ],
  },
  preprocessorOptions: configThemeConfig(),
},
```
<a name="ycCex"></a>
#### 4.3.1 configThemeConfig
```shell
自定义主题支持和插入全局css变量
export function configThemeConfig() {
  return {
    less: {
      modifyVars: {
        'primary-color': '#3D77FF',
        'border-radius-base': '4px',
        'btn-border-radius-base': '4px',
        'btn-disable-bg': 'rgba(85,98,123,0.06)',
      },
      javascriptEnabled: true,
    },
    scss: {
      additionalData: `
      @use 'sass:math';
      @import "src/assets/scss/vars.scss";
      @import "src/assets/scss/mymixin.scss";
      `,
      // 或 @use './src/assets/styles/var.scss'
      charset: false, // vite2打包出现警告，"@charset" must be the first，消除 https://github.com/element-plus/element-plus/issues/3219
    },
  };
}
```
<a name="NmiAl"></a>
### 4.4 define
```shell
定义全局常量替换方式
define: {
  'process.env': process.env,
  BUILD_YEAR: new Date().getFullYear().toString(),
  // setting vue-i18-next
  // Suppress warning
  __VUE_I18N_LEGACY_API__: false,
  __VUE_I18N_FULL_INSTALL__: false,
  __INTLIFY_PROD_DEVTOOLS__: false,
},
```
<a name="iCbF2"></a>
### 4.5 server
```shell
server: {
  port: Number(VITE_PORT),
  open: true,
  https: protocol === 'https',
  proxy,
},

proxy 内容

import { API_BASE_URL, API_TARGET_URL, MOCK_API_BASE_URL, MOCK_API_TARGET_URL } from './constant';
import type { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

const proxy: ProxyTargetList = {
  // test
  [API_BASE_URL]: {
    target: API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
  },
  // mock
  [MOCK_API_BASE_URL]: {
    target: MOCK_API_TARGET_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
  },
  // websocket: {
  //   target: `ws${protocol === "https" ? "s" : ""}://${VITE_WS_SERVER}`,
  //   changeOrigin: true,
  //   secure: false,
  //   ws: true,
  // },
};

export default proxy;
```
<a name="Fp5l6"></a>
### 4.6 optimizeDeps
```shell
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
```
<a name="ZHPAW"></a>
### 4.7 build
```shell
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

configManualChunk 打包优化
// https://juejin.cn/post/7041188884864040991#heading-18
const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['ant-design-vue', '@ant-design'],
    output: '@antd',
  },
  {
    match: ['@antv', 'd3'],
    output: '@antv',
  },
];
const srcLibs: { match: string[]; output: string }[] = [
  {
    match: ['components/Form/src'],
    output: 'form-items',
  },
];

export function configManualChunk(id: string) {
  if (/(.*)\/node_modules\/(.*)/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : '@vendor';
  } else if (/(.*)\/src\/(.*)/.test(id)) {
    const matchItem = srcLibs.find((item) => {
      const reg = new RegExp(`[\\/]src[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
}
```
<a name="LphV4"></a>
## 4.Utils/http.ts
```shell
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_PREFIX } from '../../viteConfig/constant';

// baseURL
const BASE_URL = import.meta.env.MODE === 'development' ? API_PREFIX : '';

const instance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, 跨域请求设置
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  },
  // x-www-form-urlencoded data需进行格式化
  // transformRequest: [function(data) { // 对 data 进行任意转换处理，只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  //   return qs.stringify(data);
  // }]
});

instance.interceptors.request.use(
  (config) => {
    // if no permission
    // return Promise.reject('没有操作权限');

    // 设置 config
    // config.headers = { ...config.headers, ...others };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data as ResData<any>; // 可指定 type
    const { code, message, result } = res;
    if (![0, 200].includes(code)) {
      // todo 分类 code
      console.log(message);
      return Promise.reject(message);
    }
    return result;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const _default = <T = any>(
  config: AxiosRequestConfig,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  if (typeof config === 'string') {
    return instance.request<T, T>({
      url: config,
      ...options,
    });
  } else {
    return instance.request<T, T>(config);
  }
};

function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return _default({ ...config, method: 'GET' }, options);
}

function post<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return _default({ ...config, method: 'POST' }, options);
}

export { _default as default, get, post };
export type { AxiosInstance, AxiosResponse };

```
<a name="cHbjD"></a>
## 5. Apis
```shell
import { get } from '@/utils/http';

enum URL {
  page_one_list = '/v1/common/page_one/list',
}

interface PageReqParams {
  limit: number;
  page: number;
}

interface PageResult {
  id: number;
  url: string;
  ip: string;
  protocol: string;
  host: number;
  domain: string;
  email: string;
}

const page_one_list = async (params: PageReqParams) =>
  get<{ total: number; list: PageResult[] }>({ url: URL.page_one_list, params });

export { page_one_list };
export type { PageReqParams, PageResult };

```
<a name="bz9l7"></a>
## 6. Store + Pinia
```shell
import { createPinia } from 'pinia';

const store = createPinia();

export { store };

// 因为 pinia的实现也是通过vue的各种api（ref/reactive/computed等）
// 所以，不要求一定要在Vue上挂载注册，可以随便在组件中使用，组件外使用也有对应方案
// 不过，app.use(store) 可以把store实例挂载到Vue上使用

// https://pinia.vuejs.org/core-concepts/#using-the-store
// const store = useStore()
// // ❌ This won't work because it breaks reactivity
// // it's the same as destructuring from `props`
// const { name, doubleCount } = store
// you can use:
// 1.computed(() => store.a)
// 2.{ a } = storeToRefs(store)
```
<a name="CaTO2"></a>
### 6.1 store.d.ts
```shell
import { PageResult } from '@/apis/common';

// 由于import 一些属性，则 StoreTypes 需要 global 包裹 暴露至global
declare global {
  declare namespace StoreTypes {
    export interface CommonTypes {
      token: string;
      userInfo: {
        userName?: string;
      };
      pageOneTotal: number;
      pageOneList: PageResult[];
      language?: string;
      getUserName?: string;
    }

    export interface CountTypes {
      count: number;
    }
  }
}
```
<a name="TXQQ4"></a>
### 6.2 modules/common.ts
```shell
import { defineStore, storeToRefs } from 'pinia';
import { useStorage } from '@vueuse/core';
import { store } from '@/store';
import { page_one_list, type PageReqParams } from '@/apis/common';

// demo 1
// export const commonStore = defineStore({
//   id: 'common',
//   state: (): StoreTypes.CommonTypes => ({
//     language: 'zh',
//     token: '',
//     userInfo: {},
//   }),
//   getters: {
//     getUserName: (state) => {
//       return state.userInfo?.userName;
//     },
//   },
//   actions: {
//     setUserInfo(info) {
//       this.userInfo = info;
//     },
//     async fetchInfo(params) {
//       const res = await page_one_list(params);
//       if (res) {
//         this.setUserInfo(res);
//       }
//       return res;
//     },
//   },
// });

export function getLocale(): string {
  const browserLocal = (navigator.language || 'en').toLowerCase().substring(0, 2); // 常规浏览器语言和IE浏览器
  if (['zh', 'en'].includes(browserLocal)) return browserLocal;
  return 'en';
}

// demo2
export const commonStore = defineStore('common', () => {
  const language = useStorage('LANGUAGE', getLocale());
  const state: StoreTypes.CommonTypes = reactive({
    token: '',
    userInfo: {},
    pageOneTotal: 0,
    pageOneList: [],
    language: computed({
      get: () => {
        return language.value;
      },
      set: (val: string) => {
        language.value = val;
      },
    }),
    getUserName: computed(() => state.userInfo?.userName),
  });

  function setLanguage(language: string) {
    state.language = language;
  }

  function setUserInfo(info) {
    state.userInfo = info;
  }

  async function fetchPageOne(params: PageReqParams) {
    const res = await page_one_list(params);
    console.log(res);
    if (res) {
      state.pageOneTotal = res.total;
      state.pageOneList = res.list;
    }
    return res;
  }

  return {
    ...toRefs(state),
    setLanguage,
    setUserInfo,
    fetchPageOne,
  };
});

export function useCommonStore() {
  const store = commonStore(); // 由于commonStore 值直接解构会丢失响应式，故进行二次封装

  return {
    ...storeToRefs(store),
    setLanguage: store.setLanguage,
    setUserInfo: store.setUserInfo,
    fetchPageOne: store.fetchPageOne,
  };
}

// Need to be used outside the setup
export function useCommonStoreWithOut() {
  return commonStore(store);
}

```
<a name="UQrg1"></a>
## 7. Language + I18n
```shell
import { createI18n, I18nOptions } from 'vue-i18n';
import { useCommonStoreWithOut } from '@/store/modules/common';
import TrComponent from './TrComponent.vue';

const commonStore = useCommonStoreWithOut();

const options: I18nOptions = {
  // legacy: false, // 使用复合API，你必须设置“false”，但全局app.config.globalProperties.$t 则无法使用
  locale: commonStore.language!,
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: {
      OK: 'OK',
      Cancel: 'Cancel',
    },
    zh: {
      OK: '确定',
      Cancel: '取消',
    },
  },
  sync: true, // If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
  silentTranslationWarn: true, // true - warning off
  missingWarn: false,
  silentFallbackWarn: true,
  warnHtmlInMessage: 'off',
};

const i18n = createI18n(options);

const $vt = (key: string, value = {}) => {
  try {
    if (i18n.global.te(key)) return i18n.global.t(key, value);
    else return key;
  } catch (error) {
    throw key;
  }
};

// 组件方式, 只能给接收vnode的参数用
export const $fm = (tKey: string, tValues?: object) => {
  return h(TrComponent, { tKey, tValues });
};

export { i18n as default, $vt, $fm };
```
<a name="co1Fr"></a>
### 7.1 TrComponent.vue
```shell
<template>
  {{ $t(key!, {...(values || {})}) }}
</template>

<script lang="ts" setup name="TrComponent">
  withDefaults(defineProps<{ key: string; values?: Record<string, any> }>(), {
    key: '',
    values: undefined,
  });
</script>

```
<a name="wDP3V"></a>
## 8. Hooks
```shell
import dayjs from 'dayjs';
import { useCommonStore } from '@/store/modules/common';
import i18n from '@/language';
import antZh from 'ant-design-vue/es/locale/zh_CN';
import antEn from 'ant-design-vue/es/locale/en_US';
import dayjsZh from 'dayjs/locale/zh-cn';
import dayjsEn from 'dayjs/locale/en';

const antdvLocales = {
  en: antEn,
  zh: antZh,
};

const dayjsLocales = {
  en: dayjsEn,
  zh: dayjsZh,
};

export function useLanguage() {
  const { language } = useCommonStore();
  const antConfigLocale = ref<any>(null);

  watch(
    language!,
    (n) => {
      if (n) {
        i18n.global.locale = n; // legacy: true
        // i18n.global.locale.value = locale;
        // 切换dayjs语言
        dayjs.locale(dayjsLocales[n]);
        // 切换antdv语言
        antConfigLocale.value = antdvLocales[n];
      }
    },
    {
      immediate: true,
    },
  );

  return {
    language,
    antConfigLocale,
  };
}

App.vue 根组件中使用，通过antConfigLocale控制antd local
```
<a name="T4tzw"></a>
## 9. Router
```shell
import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './router.config';

// app router
export const router = createRouter({
  // 解决 二级路径存在时，路径地址路由不匹配的问题
  // https://juejin.cn/post/7051826951463370760#heading-27
  history: createWebHashHistory(),
  routes,
  strict: true,
  scrollBehavior: (to, from, savedPosition) => {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ left: 0, top: 0 });
        }
      }, 250);
    });
  },
});
```
<a name="bM2OW"></a>
### 9.1 router.config
```shell
import { RouterView } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
// import BlankLayout from '@/layouts/BlankLayout.vue';

const BlankLayout = () => {
  return h(RouterView);
};

export const routes: RouteRecordRaw[] = [
  {
    path: '/app',
    name: 'app',
    component: markRaw(BlankLayout),
    redirect: '/app/home',
    meta: { title: 'xxxx' },
    children: [
      {
        path: '/app/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: '',
          auth: ['home'],
        },
      },
      {
        path: '/app/about',
        component: () => import('@/views/about/index.vue'),
        name: 'about',
        meta: {
          title: '关于',
          icon: '',
          auth: ['about'],
        },
      },
    ],
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/app',
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/:pathMatch(.*)', // 未知路由匹配
    redirect: '/app',
  },
];

```
<a name="frlCW"></a>
### 9.2 router.guards
```shell
import { router } from '.';

// const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to: any, _, next) => {
  next();
  // 可在此进行 动态路由添加 和 路由鉴权处理

  // 或者可以再main.ts 中先进行router.addRoute后，再createApp(App).use(router)
});

router.afterEach((to, from, failure) => {
  console.log(to);
});

router.onError((error) => {
  console.log(error, 'router error');
});

```
<a name="Tv2ho"></a>
## 10. 组件中具体使用
```shell
<script setup lang="ts" name="HelloWorld">
  import { PropType } from 'vue';
  import { useCountStore } from '@/store/modules/count';
  const { count, doubleCount, increment } = useCountStore();

  // 纯 ts
  // defineProps<{ msg: string }>();
  // withDefaults(defineProps<{ msg: string }>(), {
  //   msg: '123',
  // });

  // 使用 PropType + 默认值
  const props = defineProps({
    msg: {
      type: String as PropType<string>,
      default: '123',
    },
  });
  console.log(props);

  // message.error('123123');

  // notification.success({
  //   message: 'Notification Title',
  //   description:
  //     'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  // });

  // Modal.confirm({
  //   title: 'Do you Want to delete these items?',
  //   content: h('div', { style: 'color:red;' }, 'Some descriptions'),
  //   onOk() {
  //     console.log('OK');
  //   },
  //   onCancel() {
  //     console.log('Cancel');
  //   },
  //   class: 'test',
  // });
</script>
```
<a name="QedKv"></a>
## 项目地址
[https://github.com/liulei92/vite_pinia_template](https://github.com/liulei92/vite_pinia_template)

## Plans

### 0325

准备 vite_pinia_template
- [x] ~~优化vite.config.ts~~
  - plugin: analysis, autoImport, compenent, compress, html, legacy, styleImport, scgIcons
  - proxy, rollupConfig, themeConfig
- [x] ~~增加 store(pinia) 和 router~~


### 0326
- [x] ~~添加基础utils库~~
- [x] ~~添加mock数据plugin~~

- [ ] todo formItems components

### 0328
- [x] ~~添加 i18n~~

### 0329
- [x] ~~优化plugins（autoImport 和 components）的使用~~
- [x] ~~添加vite-plugin-vue-setup-extend vite-plugin-optimize-persist vite-plugin-package-config的使用~~

https://github.com/vbenjs/vue-vben-admin