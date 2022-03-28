<template>
  {{ $t(key!, {...(values || {})}) }}
</template>

<script lang="ts" setup>
  withDefaults(defineProps<{ key: string; values?: Record<string, any> }>(), {
    key: '',
    values: undefined,
  });
</script>
