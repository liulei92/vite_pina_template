/*
 * @Description: common
 * @Date: 2022-03-24 16:10:18
 * @Author: LeiLiu
 */
import { defineStore, storeToRefs } from 'pinia';
import { store } from '@/store';

export const commonStore = defineStore({
  id: 'common',
  state: (): StoreTypes.CommonTypes => ({
    token: '',
    userInfo: {},
  }),
  getters: {
    getUserName: (state) => {
      return state.userInfo?.userName;
    },
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = info;
    },
    // async fetchInfo() {
    //   const res = await fetchApi.info();
    //   if (res) {
    //     this.setUserInfo(res);
    //   }
    //   return res;
    // }
  },
});

export function useCommonStore() {
  const store = commonStore(); // 由于commonStore 值直接解构会丢失响应式，故进行二次封装

  return {
    ...storeToRefs(store),
    setUserInfo: store.setUserInfo,
  };
}

// Need to be used outside the setup
export function useComeStoreWithOut() {
  return commonStore(store);
}
