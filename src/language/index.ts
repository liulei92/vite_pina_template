/*
 * @Description: language
 * @Date: 2022-03-28 16:18:40
 * @Author: LeiLiu
 */
import { createI18n, I18nOptions } from 'vue-i18n';
import { useCommonStoreWithOut } from '@/store/modules/common';
import enWords from './en';
import zhWords from './zh';
import TrComponent from './TrComponent.vue';

const commonStore = useCommonStoreWithOut();

const options: I18nOptions = {
  // legacy: false, // 使用复合API，你必须设置“false”，但全局app.config.globalProperties.$t 则无法使用
  locale: commonStore.language!,
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en: enWords,
    zh: zhWords,
  },
  sync: true, // If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
  silentTranslationWarn: true, // true - warning off
  missingWarn: false,
  silentFallbackWarn: true,
  warnHtmlInMessage: 'off',
};

const i18n = createI18n(options);

const $vt = (key: string, value = {}) => {
  try {
    if (i18n.global.te(key)) return i18n.global.t(key, value);
    else return key;
  } catch (error) {
    throw key;
  }
};

// 组件方式, 只能给接收vnode的参数用
const $fm = (tKey: string, tValues?: object) => {
  return h(TrComponent, { tKey, tValues });
};

export { i18n as default, $vt, $fm };
