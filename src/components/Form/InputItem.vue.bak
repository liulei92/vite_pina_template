<template>
  <form-item v-bind="formItemProps">
    <a-input v-bind="inputProps">
      <template v-if="$slots.addonAfter" #addonAfter>
        <slot name="addonAfter">{{ addonAfter }}</slot>
      </template>
      <template v-if="$slots.addonBefore" #addonBefore>
        <slot name="addonBefore">{{ addonBefore }}</slot>
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix">{{ prefix }}</slot>
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix">{{ suffix }}</slot>
      </template>
    </a-input>
  </form-item>
</template>

<script lang="ts" setup name="InputItem">
  import type { ExtractPropTypes } from 'vue';
  import { FormItemProps, InputProps, InputItemProps } from './props';

  const props = defineProps(InputItemProps);

  const formItemProps = computed(() => {
    return Object.keys(FormItemProps).reduce((s, c) => {
      s[c] = props[c];
      return s;
    }, {}) as ExtractPropTypes<typeof FormItemProps>;
  });

  const inputProps = computed(() => {
    return Object.keys(InputProps).reduce((s, c) => {
      s[c] = props[c];
      return s;
    }, {}) as ExtractPropTypes<typeof InputProps>;
  });
</script>

<style lang="scss" scoped></style>
