/*
 * @Description: ButtonsItem
 * @Date: 2022-04-06 15:29:20
 * @Author: LeiLiu
 */
import type { Slot } from 'vue';
import { Form, Button } from 'ant-design-vue';

import { FormItemProps, ButtonItemProps } from './props';
import type { IFormItemProps, IButtonProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

export const ButtonSlots: string[] = ['okIcon', 'okText', 'resetIcon', 'resetText']; // icon: () => {}

const ButtonsItem = defineComponent({
  name: 'ButtonsItem',
  inheritAttrs: false,
  props: ButtonItemProps,
  slots: [FormItemSlots, ...ButtonSlots],
  emits: ['ok', 'reset'],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });
    const okLoading = ref(false);
    const resetLoading = ref(false);

    const resetEvent = async (e, _props) => {
      if ('loading' in _props) return await (props?.onReset && props?.onReset(e));
      resetLoading.value = true;
      await (props?.onReset && props?.onReset(e));
      setTimeout(() => {
        resetLoading.value = false;
      }, 250);
    };

    const okEvent = async (e, _props) => {
      if ('loading' in _props) return await (props?.onOk && props?.onOk(e));
      okLoading.value = true;
      await (props?.onOk && props?.onOk(e));
      setTimeout(() => {
        okLoading.value = false;
      }, 250);
    };

    return () => {
      const formItemProps: IFormItemProps = {};
      let okButtonProps: IButtonProps = {};
      let resetButtonProps: IButtonProps = {};
      const formItemSlots: Indexable<Slot> = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key === 'okButton') okButtonProps = props.okButton!;
        if (key === 'resetButton') resetButtonProps = props.resetButton!;
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key]!;
        // others will need to done
      }

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          {!resetButtonProps.hidden && (
            <Button
              class="m-r-8px"
              type="default"
              {...resetButtonProps}
              v-slots={slots.resetIcon ? { icon: slots.resetIcon } : {}}
              onClick={(e) => resetEvent(e, resetButtonProps)}
            >
              {resetButtonProps?.text
                ? resetButtonProps?.text
                : slots?.resetText
                ? slots?.resetText()
                : null}
            </Button>
          )}
          {!okButtonProps.hidden && (
            <Button
              type="primary"
              loading={okLoading.value}
              {...okButtonProps}
              v-slots={slots.okIcon ? { icon: slots.okIcon } : {}}
              onClick={(e) => okEvent(e, okButtonProps)}
            >
              {okButtonProps?.text ? okButtonProps?.text : slots?.okText ? slots?.okText() : null}
            </Button>
          )}
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default ButtonsItem;
