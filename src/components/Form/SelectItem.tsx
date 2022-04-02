/*
 * @Description: SelectItem
 * @Date: 2022-04-02 16:02:55
 * @Author: LeiLiu
 */
import { Form, Select } from 'ant-design-vue';

import { FormItemProps, SelectProps, SelectItemProps } from './props';
import type { IFormItemProps, ISelectProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

export const SelectSlots = [
  'notFoundContent',
  'suffixIcon',
  'itemIcon',
  'removeIcon',
  'clearIcon',
  'dropdownRender',
  'option',
  'placeholder',
  'tagRender',
  'maxTagPlaceholder',
  'optionLabel', // donot use, maybe remove it
];

const SelectItem = defineComponent({
  name: 'SelectItem',
  inheritAttrs: false,
  props: SelectItemProps,
  slots: [FormItemSlots, ...SelectSlots],
  // emits: [],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });

    return () => {
      const formItemProps: IFormItemProps = {};
      const selectProps: ISelectProps = {};
      const formItemSlots = {};
      const selectSlots = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in SelectProps) selectProps[key] = props[key];
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key];
        if (SelectSlots.includes(key)) selectSlots[key] = slots[key];
        // others will need to done
      }

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          <Select {...selectProps} v-slots={selectSlots} />
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default SelectItem;
