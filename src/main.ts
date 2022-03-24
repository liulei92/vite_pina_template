import { createApp } from 'vue';
import 'virtual:svg-icons-register'; // 引入vite-plugin-svg-icons
import { message } from 'ant-design-vue';
import type { MessageApi } from 'ant-design-vue/lib/message';
import App from './App.vue';
import { store } from './store';
import { router } from './router';
import './router/router.guards';

// 全局配置
message.config({
  // top: `152px`,
  // prefixCls: "ant-message", // 自定义class
  // duration: 3,
  maxCount: 1, // 同时只能存在一个
});

const app = createApp(App);

// 全局属性
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $message: MessageApi;
  }
}

app.config.globalProperties.$message = message;

app.use(store).use(router);

router.isReady().then(() => app.mount('#app'));

// 可参考 https://github.com/JS-banana/vite-vue3-ts
