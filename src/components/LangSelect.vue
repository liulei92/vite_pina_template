<template>
  <a-select v-model:value="language">
    <a-select-option value="zh">中文</a-select-option>
    <a-select-option value="en">English</a-select-option>
  </a-select>
</template>

<script lang="ts" setup>
  import { useCommonStore } from '@/store/modules/common';

  const { language } = useCommonStore();
</script>
