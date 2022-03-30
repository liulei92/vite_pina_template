/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: router.guards
 * @Date: 2022-03-24 16:03:58
 * @Author: LeiLiu
 */

import { router } from '.';
import { useCommonStoreWithOut } from '@/store/modules/common';

const whiteList = ['/login']; // no redirect whitelist
const commonStore = useCommonStoreWithOut();
router.beforeEach(async (to: any, _, next) => {
  if (commonStore.token) {
    if (to.path === '/login') {
      next({ path: '/app' }); // 指向根，然后 重定向
    } else {
      next(); // 默认前往
      try {
        // 可在此进行 动态路由添加 和 路由鉴权处理
      } catch (error) {}
    }
  } else {
    commonStore.setUserInfo(null);
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next({ path: '/login', replace: true });
    }
  }

  // 或者可以再main.ts 中先进行router.addRoute后，再createApp(App).use(router)
});

router.afterEach((to, from, failure) => {
  const { title } = to.meta;
  if (title) {
    document.title = title as string;
  }
});

router.onError((error) => {
  console.log(error, 'router error');
});
