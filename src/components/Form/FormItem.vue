<template>
  <a-form-item v-bind="{ ...otherProps }">
    <template #label>
      <slot v-if="$slots.label" name="label">{{ label }}</slot>
      <template v-if="label">
        {{ label }}
        <a-tooltip v-if="tip" :destroyTooltipOnHide="true" :title="$vt(tip)">
          <QuestionCircleFilled style="color: #6c6c6c" />
        </a-tooltip>
      </template>
    </template>
    <slot name="default"></slot>
    <template v-if="$slots.extra" #extra>
      <slot name="extra">{{ extra }}</slot>
    </template>
  </a-form-item>
</template>

<script lang="ts" setup name="FormItem">
  import { Form } from 'ant-design-vue';
  import { QuestionCircleFilled } from '@ant-design/icons-vue';
  import { FormItemProps } from './props';

  const props = defineProps(FormItemProps);

  const otherProps = computed(() => omit(props, ['label', 'extra', 'tip']));

  const formItemContext = Form.useInjectFormItemContext();

  defineExpose({
    formItemContext,
  });

  // 问题 默认值无法生效 0401
  // interface Props extends FormItemProps {
  //   tip?: string;
  // }
  // const props = withDefaults(defineProps<Props>(), {
  //   colon: false,
  //   tip: '',
  // });
</script>

<style lang="scss" scoped></style>
