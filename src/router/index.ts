/*
 * @Description: router
 * @Date: 2022-03-24 15:42:10
 * @Author: LeiLiu
 */
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
