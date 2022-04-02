/*
 * @Description: SwitchItem
 * @Date: 2022-04-02 16:42:53
 * @Author: LeiLiu
 */
import { Form, Switch } from 'ant-design-vue';

import { FormItemProps, SwitchProps, SwitchItemProps } from './props';
import type { IFormItemProps, ISwitchProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

export const SwitchSlots = ['checkedChildren', 'unCheckedChildren'];

const SwitchItem = defineComponent({
  name: 'SelectItem',
  inheritAttrs: false,
  props: SwitchItemProps,
  slots: [FormItemSlots, ...SwitchSlots],
  // emits: [],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });

    return () => {
      const formItemProps: IFormItemProps = {};
      const switchProps: ISwitchProps = {};
      const formItemSlots = {};
      const switchSlots = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in SwitchProps) switchProps[key] = props[key];
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key];
        if (SwitchSlots.includes(key)) switchSlots[key] = slots[key];
        // others will need to done
      }

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          <Switch {...switchProps} v-slots={switchSlots} />
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default SwitchItem;
