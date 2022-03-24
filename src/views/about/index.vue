<script setup lang="ts">
  import { useCountStore } from '@/store/modules/count';

  const { count } = useCountStore();
</script>

<template>
  <div> about: {{ count }} </div>
</template>
