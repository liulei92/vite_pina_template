/*
 * @Description: SelectItem
 * @Date: 2022-04-02 16:02:55
 * @Author: LeiLiu
 */
import type { Slot } from 'vue';
import { Select } from 'ant-design-vue';

import { FormItemProps, SelectProps, SelectItemProps } from './props';
import type { IFormItemProps, ISelectProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

import { useInjectFormRef } from '@/hooks/useFormRef';

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
  setup(props, { slots, attrs }) {
    const formRef = useInjectFormRef();

    return () => {
      const formItemProps: IFormItemProps = {};
      const selectProps: ISelectProps = {};
      const formItemSlots: Indexable<Slot> = {};
      const selectSlots: Indexable<Slot> = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in SelectProps) {
          if (key === 'onChange') {
            selectProps[key] = (...args) => {
              props[key]?.apply(void 0, args);
              unref(formRef)?.clearValidate(props.name);
            };
          } else {
            selectProps[key] = props[key];
          }
        }
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key]!;
        if (SelectSlots.includes(key)) selectSlots[key] = slots[key]!;
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
