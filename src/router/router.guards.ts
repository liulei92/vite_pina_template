/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Description: router.guards
 * @Date: 2022-03-24 16:03:58
 * @Author: LeiLiu
 */

import { router } from '.';
import { useCountStoreWithOut } from '@/store/modules/count';

// const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to: any, _, next) => {
  next();
});

router.afterEach((to, from, failure) => {
  console.log(to);
  const countStore = useCountStoreWithOut();
  console.log(countStore.count);
});

router.onError((error) => {
  console.log(error, 'router error');
});
