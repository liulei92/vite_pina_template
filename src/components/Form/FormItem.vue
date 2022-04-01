<template>
  <a-form-item v-bind="{ ...otherProps }">
    <template #label>
      <slot v-if="slots.label" name="label">{{ props?.label }}</slot>
      <template v-if="props?.label">
        {{ props?.label }}
        <a-tooltip v-if="props.tip" :destroyTooltipOnHide="true" :title="$vt(props.tip)">
          <QuestionCircleFilled style="color: #6c6c6c" />
        </a-tooltip>
      </template>
    </template>
    <slot name="default"></slot>
    <template #extra>
      <slot name="extra">{{ props?.extra }}</slot>
    </template>
  </a-form-item>
</template>

<script lang="ts" setup name="FormItem">
  import { Form } from 'ant-design-vue';
  import { QuestionCircleFilled } from '@ant-design/icons-vue';
  import { BasicItemProps } from './props';

  const props = defineProps(BasicItemProps);

  const otherProps = computed(() => omit(props, ['label', 'extra', 'tip']));

  const slots = useSlots();

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
