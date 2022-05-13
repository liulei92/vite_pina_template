/*
 * @Description: useLanguage
 * @Date: 2022-03-28 16:41:04
 * @Author: LeiLiu
 */
import dayjs from 'dayjs';
import { useCommonStore } from '@/store/modules/common';
import i18n from '@/language';
import antZh from 'ant-design-vue/es/locale/zh_CN';
import antEn from 'ant-design-vue/es/locale/en_US';
import antAr from 'ant-design-vue/es/locale/ar_EG';
import dayjsZh from 'dayjs/locale/zh-cn';
import dayjsEn from 'dayjs/locale/en';
import dayjsAr from 'dayjs/locale/ar';

const antdvLocales = {
  en: antEn,
  zh: antZh,
  ar: antAr,
};

const dayjsLocales = {
  en: dayjsEn,
  zh: dayjsZh,
  ar: dayjsAr,
};

export function useLanguage() {
  const { language } = useCommonStore();
  const antConfigLocale = ref<any>(null);
  const direction = ref<'ltr' | 'rtl'>('ltr');

  watch(
    language!,
    (n) => {
      if (n) {
        i18n.global.locale = n; // legacy: true
        // i18n.global.locale.value = locale;
        // 切换dayjs语言
        dayjs.locale(dayjsLocales[n]);
        // 切换antdv语言
        antConfigLocale.value = antdvLocales[n];
        document.documentElement.setAttribute('lang', n);

        direction.value = n === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', direction.value);
      }
    },
    {
      immediate: true,
    },
  );

  return {
    language,
    antConfigLocale,
    direction,
  };
}
