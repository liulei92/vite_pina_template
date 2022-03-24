/*
 * @Description: count
 * @Date: 2022-03-24 16:20:26
 * @Author: LeiLiu
 */
import { defineStore, storeToRefs } from 'pinia';
import { store } from '@/store';
import { commonStore } from './common';

export const countStore = defineStore('counter', () => {
  const count = ref(0);
  const doubleCount = computed(() => {
    return count.value * 2;
  });
  function increment() {
    count.value++;
    const common = commonStore(); // 使用其他store
    console.log(common.token);
  }

  return { count, doubleCount, increment };
});

// export const useCountStore = defineStore({
//   id: 'counter',
//   state: () => ({
//     count: 0,
//   }),
//   actions: {
//     increment() {
//       console.log(123);
//       this.count++;
//     },
//   },
// });

export function useCountStore() {
  const store = countStore(); // 由于countStore 值直接解构会丢失响应式，故进行二次封装

  return {
    ...storeToRefs(store),
    increment: store.increment,
  };
}

// Need to be used outside the setup
export function useCountStoreWithOut() {
  return countStore(store);
}
