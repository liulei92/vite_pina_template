<template>
  <!-- <a-select v-model:value="language">
    <a-select-option value="zh">中文</a-select-option>
    <a-select-option value="en">English</a-select-option>
  </a-select> -->
  <a-dropdown placement="bottomRight">
    <template #overlay>
      <a-menu :selectedKeys="[language!]">
        <a-menu-item key="zh" @click="language = 'zh'">中文</a-menu-item>
        <a-menu-item key="en" @click="language = 'en'">English</a-menu-item>
        <a-menu-item key="ar" @click="language = 'ar'">阿拉伯语</a-menu-item>
      </a-menu>
    </template>
    <div class="lang-select"><translation-outlined class="fz22 pointer" /></div>
  </a-dropdown>
</template>

<script lang="ts" setup name="LangSelect">
  import { TranslationOutlined } from '@ant-design/icons-vue';
  import { useCommonStore } from '@/store/modules/common';

  const { language } = useCommonStore();
</script>
