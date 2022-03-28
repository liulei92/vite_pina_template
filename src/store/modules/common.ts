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
  const state: StoreTypes.CommonTypes = reactive({
    token: '',
    userInfo: {},
    pageOneTotal: 0,
    pageOneList: [],
    language: computed({
      get: () => {
        return language.value;
      },
      set: (val: string | null) => {
        language.value = val;
      },
    }),
    getUserName: computed(() => state.userInfo?.userName),
  });

  function setLanguage(language: string) {
    state.language = language;
  }

  function setUserInfo(info) {
    state.userInfo = info;
  }

  async function fetchPageOne(params: PageReqParams) {
    const res = await page_one_list(params);
    console.log(res);
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
export function useComeStoreWithOut() {
  return commonStore(store);
}
