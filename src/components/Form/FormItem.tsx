/*
 * @Description: FormItem.tsx
 * @Date: 2022-04-01 22:52:38
 * @Author: LeiLiu
 */
import { Form, Tooltip } from 'ant-design-vue';
import { QuestionCircleFilled } from '@ant-design/icons-vue';
import { $vt } from '@/language';
import { FormItemProps } from './props';

export const FormItemSlots = ['help', 'label', 'extra'];

const FormItem = defineComponent({
  name: 'FormItem',
  inheritAttrs: false,
  props: FormItemProps,
  slots: FormItemSlots,
  setup: function setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });
    return () => {
      const { label, tip, ...formItemProps } = props;

      return (
        <Form.Item
          label={
            label && (
              <span>
                {$vt(label)}
                {tip && (
                  <Tooltip destroyTooltipOnHide={true} title={$vt(tip)}>
                    <QuestionCircleFilled style="color: #6c6c6c" />
                  </Tooltip>
                )}
              </span>
            )
          }
          {...formItemProps}
          {...attrs}
          v-slots={slots}
        ></Form.Item>
      );
    };
  },
});

export default FormItem;
