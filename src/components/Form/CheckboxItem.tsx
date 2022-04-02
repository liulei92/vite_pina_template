/*
 * @Description: CheckboxItem
 * @Date: 2022-04-02 17:35:28
 * @Author: LeiLiu
 */
import { Form, Checkbox } from 'ant-design-vue';

import { FormItemProps, CheckboxProps, CheckboxItemProps } from './props';
import type { IFormItemProps, ICheckboxProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

export const CheckboxSlots: string[] = [];

const CheckboxItem = defineComponent({
  name: 'CheckboxItem',
  inheritAttrs: false,
  props: CheckboxItemProps,
  slots: [FormItemSlots, ...CheckboxSlots],
  // emits: [],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });

    return () => {
      const formItemProps: IFormItemProps = {};
      const checkboxProps: ICheckboxProps = {};
      const formItemSlots = {};
      const checkboxSlots = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in CheckboxProps) checkboxProps[key] = props[key];
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key];
        if (CheckboxSlots.includes(key)) checkboxSlots[key] = slots[key];
        // others will need to done
      }

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          <Checkbox {...checkboxProps} v-slots={checkboxSlots}>
            {props?.tag}
          </Checkbox>
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default CheckboxItem;
