/*
 * @Description: props.ts
 * @Date: 2022-04-01 17:18:54
 * @Author: LeiLiu
 */
import { PropType } from 'vue';
import type { FormItemProps, InputProps as $InputProps } from 'ant-design-vue';

export const BasicItemProps = {
  label: String as PropType<FormItemProps['label']>,
  help: String as PropType<FormItemProps['help']>,
  extra: String as PropType<FormItemProps['extra']>,
  labelCol: Object as PropType<FormItemProps['labelCol']>,
  wrapperCol: Object as PropType<FormItemProps['wrapperCol']>,
  colon: Boolean as PropType<FormItemProps['colon']>,
  labelAlign: String as PropType<FormItemProps['labelAlign']>,
  name: [String, Array] as PropType<FormItemProps['name']>,
  rules: [Object, Array] as PropType<FormItemProps['rules']>,
  required: Boolean as PropType<FormItemProps['required']>,
  validateFirst: Boolean as PropType<FormItemProps['validateFirst']>,
  validateStatus: String as PropType<FormItemProps['validateStatus']>,
  validateTrigger: [String, Array] as PropType<FormItemProps['validateTrigger']>,
  hidden: Boolean as PropType<FormItemProps['hidden']>,
  noStyle: Boolean as PropType<FormItemProps['noStyle']>,
  tip: String as PropType<string>,
};

export const BasicItemPropsKeys = Object.keys(BasicItemProps);

export const InputProps = {
  allowClear: Boolean as PropType<$InputProps['allowClear']>,
  bordered: Boolean as PropType<$InputProps['bordered']>,
  defaultValue: String as PropType<$InputProps['defaultValue']>,
  disabled: Boolean as PropType<$InputProps['disabled']>,
  id: String as PropType<$InputProps['id']>,
  maxlength: Number as PropType<$InputProps['maxlength']>,
  prefix: String as PropType<$InputProps['prefix']>,
  size: String as PropType<$InputProps['size']>,
  suffix: String as PropType<$InputProps['suffix']>,
  type: String as PropType<$InputProps['type']>,
  value: [String, Number] as PropType<$InputProps['value']>,
};

export const InputItemProps = {
  ...BasicItemProps,
  ...InputProps,
};
