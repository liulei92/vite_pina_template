/*
 * @Description: RadioGroupItem
 * @Date: 2022-04-02 16:49:20
 * @Author: LeiLiu
 */
import { Form, Radio } from 'ant-design-vue';

import { FormItemProps, RadioGroupProps, RadioGroupItemProps } from './props';
import type { IFormItemProps, IRadioGroupProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

export const RadioGroupSlots: string[] = [];

const RadioGroupItem = defineComponent({
  name: 'RadioGroupItem',
  inheritAttrs: false,
  props: RadioGroupItemProps,
  slots: [FormItemSlots, ...RadioGroupSlots],
  emits: ['update:value', 'change'],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });

    return () => {
      const formItemProps: IFormItemProps = {};
      const radioGroupProps: IRadioGroupProps = {};
      const formItemSlots = {};
      const radioGroupSlots = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in RadioGroupProps) radioGroupProps[key] = props[key];
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key];
        if (RadioGroupSlots.includes(key)) radioGroupSlots[key] = slots[key];
        // others will need to done
      }

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          <Radio.Group {...radioGroupProps} v-slots={radioGroupSlots} />
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default RadioGroupItem;
