/*
 * @Description: props.ts
 * @Date: 2022-04-01 17:18:54
 * @Author: LeiLiu
 */
import { PropType } from 'vue';
import { formItemProps } from 'ant-design-vue/lib/form/FormItem';
import InputProps from 'ant-design-vue/lib/input/inputProps';
import { selectProps } from 'ant-design-vue/lib/select';

const FormItemProps = {
  ...formItemProps,
  tip: String as PropType<string>,
};

const InputItemProps = {
  ...FormItemProps,
  ...InputProps,
};

const SelectProps = selectProps();

const SelectItemProps = {
  ...FormItemProps,
  ...SelectProps,
};

export { FormItemProps, InputProps, InputItemProps, SelectProps, SelectItemProps };
