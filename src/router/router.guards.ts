/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: router.guards
 * @Date: 2022-03-24 16:03:58
 * @Author: LeiLiu
 */

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
