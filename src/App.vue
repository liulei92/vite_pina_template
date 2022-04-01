<script setup lang="ts" name="App">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  // import zhCN from 'ant-design-vue/es/locale/zh_CN';
  // import enUS from 'ant-design-vue/es/locale/en_US';

  import { useCommonStore } from '@/store/modules/common';
  import { useLanguage } from '@/hooks/useLanguage';

  const { fetchInfo } = useCommonStore();
  fetchInfo()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  const { antConfigLocale } = useLanguage();

  const getPopupContainer = (node?: HTMLElement) => {
    // 父级 node 会出现意外的问题
    if (node && node.classList.contains('ant-select-selector')) {
      return (node?.parentNode || document.body) as HTMLElement;
    }
    return document.body;
  };
</script>

<template>
  <a-config-provider
    :autoInsertSpaceInButton="false"
    :getPopupContainer="getPopupContainer"
    :locale="antConfigLocale"
  >
    <router-view />
  </a-config-provider>
</template>
