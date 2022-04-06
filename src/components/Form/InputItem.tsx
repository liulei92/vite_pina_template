/*
 * @Description: InputItem
 * @Date: 2022-04-02 15:02:23
 * @Author: LeiLiu
 */
import type { Slot } from 'vue';
import { Form, Input } from 'ant-design-vue';

import { FormItemProps, InputProps, InputItemProps } from './props';
import type { IFormItemProps, IInputProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

export const InputSlots = ['addonAfter', 'addonBefore', 'prefix', 'suffix'];

const InputItem = defineComponent({
  name: 'InputItem',
  inheritAttrs: false,
  props: InputItemProps,
  slots: [FormItemSlots, ...InputSlots],
  // emits: [],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });

    return () => {
      const formItemProps: IFormItemProps = {};
      const inputProps: IInputProps = {};
      const formItemSlots: Indexable<Slot> = {};
      const inputSlots: Indexable<Slot> = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in InputProps) inputProps[key] = props[key];
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key]!;
        if (InputSlots.includes(key)) inputSlots[key] = slots[key]!;
        // others will need to done
      }

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          <Input {...inputProps} v-slots={inputSlots} />
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default InputItem;
