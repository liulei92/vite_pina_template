<script setup lang="ts" name="App">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  // import zhCN from 'ant-design-vue/es/locale/zh_CN';
  // import enUS from 'ant-design-vue/es/locale/en_US';
  import { LoadingOutlined } from '@ant-design/icons-vue';

  import { useCommonStore } from '@/store/modules/common';
  import { useLanguage } from '@/hooks/useLanguage';

  const { wholeSpin, fetchInfo } = useCommonStore();
  fetchInfo()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  const { direction, antConfigLocale } = useLanguage();

  const getPopupContainer = (node?: HTMLElement) => {
    // 父级 node 会出现意外的问题
    if (node && node.classList.contains('ant-select-selector')) {
      return (node?.parentNode || document.body) as HTMLElement;
    }
    return document.body;
  };

  const indicator = h(LoadingOutlined, {
    style: {
      fontSize: '24px',
    },
    spin: true,
  });
</script>

<template>
  <a-config-provider
    :autoInsertSpaceInButton="false"
    :getPopupContainer="getPopupContainer"
    :locale="antConfigLocale"
    :direction="direction"
  >
    <a-spin :indicator="indicator" v-bind="wholeSpin">
      <router-view />
    </a-spin>
  </a-config-provider>
</template>
