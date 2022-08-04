<template>
  {{ $t(tKey!, { ...(tValues || {}) }) }}
</template>

<script lang="ts" setup name="TrComponent">
  withDefaults(defineProps<{ tKey: string; tValues?: Record<string, any> }>(), {
    tKey: '',
    tValues: undefined,
  });
</script>
