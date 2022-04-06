/*
 * @Description: CheckboxGroupItem
 * @Date: 2022-04-06 09:22:42
 * @Author: LeiLiu
 */
import type { Slot } from 'vue';
import { Form, Checkbox, CheckboxOptionType } from 'ant-design-vue';

import { FormItemProps, CheckboxGroupProps, CheckboxGroupItemProps } from './props';
import type { IFormItemProps, ICheckboxGroupProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

export const CheckboxGroupSlots: string[] = [];

const CheckboxGroupItem = defineComponent({
  name: 'CheckboxGroupItem',
  inheritAttrs: false,
  props: CheckboxGroupItemProps,
  slots: [FormItemSlots, ...CheckboxGroupSlots, 'option'], // option: (option) => {}
  // emits: [],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });

    return () => {
      const formItemProps: IFormItemProps = {};
      const checkboxGroupProps: ICheckboxGroupProps = {};
      const formItemSlots: Indexable<Slot> = {};
      const checkboxGroupSlots: Indexable<Slot> = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in CheckboxGroupProps) {
          if (!slots?.option && key === 'options') checkboxGroupProps[key] = props[key];
          else if (key !== 'options') checkboxGroupProps[key] = props[key];
        }
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key]!;
        if (CheckboxGroupSlots.includes(key)) checkboxGroupSlots[key] = slots[key]!;
        // others will need to done
      }

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          <Checkbox.Group {...checkboxGroupProps} v-slots={checkboxGroupSlots}>
            {slots.option &&
              props.options &&
              props.options.map((option) => {
                const _option: CheckboxOptionType =
                  typeof option === 'object' ? cloneDeep(option) : { label: option, value: option };

                return (
                  <Checkbox
                    {..._option}
                    key={typeof _option.value === 'boolean' ? Number(_option.value) : _option.value}
                  >
                    {slots.option!(option)}
                  </Checkbox>
                );
              })}
          </Checkbox.Group>
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default CheckboxGroupItem;
