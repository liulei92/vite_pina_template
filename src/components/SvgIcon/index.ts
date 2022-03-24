/*
 * @Description: icons
 * @Date: 2020-12-30 12:53:03
 * @Author: LeiLiu
 */
import { App } from 'vue';
import SvgIcon from './index.vue'; // 引入自定义组件

// webpack 架构使用
// const req = require.context("./svg", false, /\.svg$/);
// const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext);

export default {
  install(app: App): void {
    app.component('SvgIcon', SvgIcon);
    // requireAll(req);
  },
};
