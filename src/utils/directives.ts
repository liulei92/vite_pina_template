/*
 * @Description: directives
 * @Date: 2022-03-30 15:14:31
 * @Author: LeiLiu
 */
import { App } from 'vue';

export default {
  install(app: App): void {
    app.directive('focus', {
      mounted(el: HTMLElement) {
        el.focus && el.focus();
      },
    });
  },
};
