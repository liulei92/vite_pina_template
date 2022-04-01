<template>
  <form-item v-bind="formItemProps">
    <a-input v-bind="inputProps" />
  </form-item>
</template>

<script lang="ts" setup name="InputItem">
  import { BasicItemPropsKeys, InputItemProps } from './props';

  const props = defineProps(InputItemProps);

  const formItemProps = computed(() => omit(props, BasicItemPropsKeys));

  const inputProps = computed(() => {
    const keys = [
      'allowClear',
      'bordered',
      'defaultValue',
      'disabled',
      'id',
      'maxlength',
      'size',
      'type',
    ];
    return keys.reduce((s, c) => {
      s[c] = props[c];
      return s;
    }, {});
  });
  // 'addonAfter', 'addonBefore', 'prefix', 'suffix', 'value'
</script>

<style lang="scss" scoped></style>
