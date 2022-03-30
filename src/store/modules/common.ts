/*
 * @Description: common
 * @Date: 2022-03-24 16:10:18
 * @Author: LeiLiu
 */
import { defineStore, storeToRefs } from 'pinia';
import { useStorage } from '@vueuse/core';
import { store } from '@/store';
import { page_one_list, type PageReqParams } from '@/apis/common';

// export const commonStore = defineStore({
//   id: 'common',
//   state: (): StoreTypes.CommonTypes => ({
//     language: 'zh',
//     token: '',
//     userInfo: {},
//   }),
//   getters: {
//     getUserName: (state) => {
//       return state.userInfo?.userName;
//     },
//   },
//   actions: {
//     setUserInfo(info) {
//       this.userInfo = info;
//     },
//     async fetchInfo(params) {
//       const res = await page_one_list(params);
//       if (res) {
//         this.setUserInfo(res);
//       }
//       return res;
//     },
//   },
// });

export function getLocale(): string {
  const browserLocal = (navigator.language || 'en').toLowerCase().substring(0, 2); // 常规浏览器语言和IE浏览器
  if (['zh', 'en'].includes(browserLocal)) return browserLocal;
  return 'en';
}

export const commonStore = defineStore('common', () => {
  const language = useStorage('LANGUAGE', getLocale());
  const userInfo = useStorage('USER', {});
  const state: StoreTypes.CommonTypes = reactive({
    pageOneTotal: 0,
    pageOneList: [],
    language: computed({
      get: () => {
        return language.value;
      },
      set: (val: string) => {
        language.value = val;
      },
    }),
    userInfo: computed({
      get: () => {
        return userInfo.value;
      },
      set: (val: StoreTypes.CommonTypes['userInfo']) => {
        userInfo.value = val;
      },
    }),
    token: computed(() => state.userInfo?.token),
  });

  function setLanguage(language: string) {
    state.language = language;
  }

  function setUserInfo(info: StoreTypes.CommonTypes['userInfo']) {
    state.userInfo = info;
  }

  async function fetchPageOne(params: PageReqParams) {
    const res = await page_one_list(params);

    if (res) {
      state.pageOneTotal = res.total;
      state.pageOneList = res.list;
    }
    return res;
  }

  return {
    ...toRefs(state),
    setLanguage,
    setUserInfo,
    fetchPageOne,
  };
});

export function useCommonStore() {
  const store = commonStore(); // 由于commonStore 值直接解构会丢失响应式，故进行二次封装

  return {
    ...storeToRefs(store),
    setLanguage: store.setLanguage,
    setUserInfo: store.setUserInfo,
    fetchPageOne: store.fetchPageOne,
  };
}

// Need to be used outside the setup
export function useCommonStoreWithOut() {
  return commonStore(store);
}
