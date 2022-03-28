/*
 * @Description: globalProperties
 * @Date: 2022-03-28 17:30:05
 * @Author: LeiLiu
 */
import { App } from 'vue';
import { $vt } from '@/language';

export default {
  install(app: App): void {
    app.config.globalProperties.$vt = $vt;
  },
};

// 全局属性
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vt: typeof $vt;
  }
}
