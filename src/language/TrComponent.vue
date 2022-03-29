<template>
  {{ $t(key!, {...(values || {})}) }}
</template>

<script lang="ts" setup name="TrComponent">
  withDefaults(defineProps<{ key: string; values?: Record<string, any> }>(), {
    key: '',
    values: undefined,
  });
</script>
