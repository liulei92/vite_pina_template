<script setup lang="ts" name="About">
  import { useCountStore } from '@/store/modules/count';

  const { count } = useCountStore();

  const color = ref('rgb(51, 51, 51)');
</script>

<template>
  <div>
    about: {{ count }}

    <color-picker v-model:value="color" />
  </div>
</template>
