import { createApp } from 'vue';
import 'virtual:svg-icons-register'; // 引入vite-plugin-svg-icons
import { message } from 'ant-design-vue';
import App from './App.vue';
import { store } from './store';
import i18n from './language';
import { router } from './router';
import globalProperties from './utils/globalProperties';
import './router/router.guards';

// 全局配置
message.config({
  // top: `152px`,
  // prefixCls: "ant-message", // 自定义class
  // duration: 3,
  maxCount: 1, // 同时只能存在一个
});

const app = createApp(App);

app.use(store).use(i18n).use(router).use(globalProperties);

router.isReady().then(() => app.mount('#app'));

// 可参考 https://github.com/JS-banana/vite-vue3-ts
