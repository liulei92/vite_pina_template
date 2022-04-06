/*
 * @Description: props.ts
 * @Date: 2022-04-01 17:18:54
 * @Author: LeiLiu
 */
import type { PropType } from 'vue';
// import vueType from 'ant-design-vue/es/_util/vue-types';
import {
  formItemProps,
  type FormItemProps as FormItemPropsType,
} from 'ant-design-vue/es/form/FormItem';
import inputProps, { type InputProps as InputPropsType } from 'ant-design-vue/es/input/inputProps';
import { selectProps, type SelectProps as SelectPropsType } from 'ant-design-vue/es/select';
import { switchProps, type SwitchProps as SwitchPropsPropsType } from 'ant-design-vue/es/switch';
import {
  radioGroupProps,
  type RadioGroupProps as RadioGroupPropsType,
} from 'ant-design-vue/es/radio/Group';
import {
  checkboxProps,
  checkboxGroupProps,
  type CheckboxProps as CheckboxPropsType,
  type CheckboxGroupProps as CheckboxGroupPropsType,
} from 'ant-design-vue/es/checkbox/interface';
import {
  uploadProps,
  type UploadProps as UploadPropsType,
} from 'ant-design-vue/es/upload/interface';
import {
  buttonProps,
  type ButtonProps as ButtonPropsType,
} from 'ant-design-vue/es/button/buttonTypes';

/* formItem */
export const FormItemProps = {
  ...formItemProps(),
  // colon: vueType.bool, // 复写 props
  colon: Boolean as PropType<boolean>,
  tip: String as PropType<string>,
};

export interface IFormItemProps extends FormItemPropsType {
  tip?: string;
  [key: string]: any;
}

/* inputItem */
export const InputProps = inputProps();
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
export const SwitchProps = switchProps();
export const SwitchItemProps = {
  ...FormItemProps,
  ...SwitchProps,
};

export interface ISwitchProps extends SwitchPropsPropsType {
  [key: string]: any;
}

/* radioGroupItem */
export const RadioGroupProps = radioGroupProps();
export const RadioGroupItemProps = {
  ...FormItemProps,
  ...RadioGroupProps,
};

export interface IRadioGroupProps extends RadioGroupPropsType {
  [key: string]: any;
}

/* checkboxItem */
export const CheckboxProps = checkboxProps();
export const CheckboxItemProps = {
  ...FormItemProps,
  ...CheckboxProps,
  checked: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: undefined,
  },
  trueVal: [String, Number] as PropType<string | number>,
  falseVal: [String, Number] as PropType<string | number>,
  render: String as PropType<string>,
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

/* uploadItem */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { name, ...uploadPropsOthers } = uploadProps();
export const UploadProps = { ...uploadPropsOthers };
export const UploadItemProps = {
  ...FormItemProps,
  ...UploadProps,
  fileFieldName: String as PropType<string>,
  render: String as PropType<string>,
};
export interface IUploadProps extends UploadPropsType {
  [key: string]: any;
}

/* buttonsItem */
export const ButtonProps = {
  ...buttonProps(),
  hidden: Boolean as PropType<boolean>,
  text: String as PropType<string>,
};
export interface IButtonProps extends ButtonPropsType {
  hidden?: boolean;
  text?: boolean;
  [key: string]: any;
}
export const ButtonItemProps = {
  ...FormItemProps,
  okButton: {
    type: Object as PropType<IButtonProps>,
    defult: () => ({}),
  },
  resetButton: {
    type: Object as PropType<IButtonProps>,
    defult: () => ({}),
  },
  onOk: {
    type: Function,
  },
  onReset: {
    type: Function,
  },
};
