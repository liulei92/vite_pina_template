/*
 * @Description: props.ts
 * @Date: 2022-04-01 17:18:54
 * @Author: LeiLiu
 */
import type { PropType } from 'vue';
// import vueType from 'ant-design-vue/lib/_util/vue-types';
import {
  formItemProps,
  type FormItemProps as FormItemPropsType,
} from 'ant-design-vue/lib/form/FormItem';
import InputProps from 'ant-design-vue/lib/input/inputProps';
import type { InputProps as InputPropsType } from 'ant-design-vue/lib/input/inputProps';
import { selectProps, type SelectProps as SelectPropsType } from 'ant-design-vue/lib/select';
import {
  switchProps as SwitchProps,
  type SwitchProps as SwitchPropsPropsType,
} from 'ant-design-vue/lib/switch';
import {
  radioGroupProps,
  type RadioGroupProps as RadioGroupPropsType,
} from 'ant-design-vue/lib/radio/Group';
import {
  checkboxProps,
  checkboxGroupProps,
  type CheckboxProps as CheckboxPropsType,
  type CheckboxGroupProps as CheckboxGroupPropsType,
} from 'ant-design-vue/lib/checkbox/interface';

/* formItem */
export const FormItemProps = {
  ...formItemProps,
  // colon: vueType.bool, // 复写 props
  colon: Boolean as PropType<boolean>,
  tip: String as PropType<string>,
};

export interface IFormItemProps extends FormItemPropsType {
  tip?: string;
  [key: string]: any;
}

/* inputItem */
export { InputProps };
export const InputItemProps = {
  ...FormItemProps,
  ...InputProps,
};

export interface IInputProps extends InputPropsType {
  [key: string]: any;
}

/* selectItem */
export const SelectProps = selectProps();

export const SelectItemProps = {
  ...FormItemProps,
  ...SelectProps,
};

export interface ISelectProps extends SelectPropsType {
  [key: string]: any;
}

/* switchItem */
export { SwitchProps };
export const SwitchItemProps = {
  ...FormItemProps,
  ...SwitchProps,
};

export interface ISwitchProps extends SwitchPropsPropsType {
  [key: string]: any;
}

/* radioGroupItem */
export const RadioGroupProps = {
  ...radioGroupProps,
  onChange: {
    type: Function as PropType<(...args: any[]) => any>,
  },
  'onUpdate:value': {
    type: Function as PropType<(...args: any[]) => any>,
  },
};
export const RadioGroupItemProps = {
  ...FormItemProps,
  ...RadioGroupProps,
};

export interface IRadioGroupProps extends RadioGroupPropsType {
  onChange?: (...args: any[]) => any;
  'onUpdate:value'?: (...args: any[]) => any;
  [key: string]: any;
}

/* checkboxItem */
export const CheckboxProps = checkboxProps();
export const CheckboxItemProps = {
  ...FormItemProps,
  ...CheckboxProps,
  tag: String as PropType<string>,
};

export interface ICheckboxProps extends CheckboxPropsType {
  [key: string]: any;
}

/* checkboxGroupItem */
export const CheckboxGroupProps = checkboxGroupProps();
export const CheckboxGroupItemProps = {
  ...FormItemProps,
  ...CheckboxGroupProps,
};

export interface ICheckboxGroupProps extends CheckboxGroupPropsType {
  [key: string]: any;
}
