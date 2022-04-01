/*
 * @Description: FormItem.tsx
 * @Date: 2022-04-01 22:52:38
 * @Author: LeiLiu
 */
import { Form, Tooltip } from 'ant-design-vue';
import { QuestionCircleFilled } from '@ant-design/icons-vue';
import { $vt } from '@/language';
import { FormItemProps } from './props';

const FormItemTsx = defineComponent({
  name: 'FormItemTsx',
  inheritAttrs: false,
  props: FormItemProps,
  slots: ['help', 'label', 'extra'],
  setup: function setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });
    return () => {
      const { label, extra, help, tip, ...others } = props;

      return (
        <Form.Item
          label={
            slots.label ? (
              slots.label()
            ) : (
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
          extra={slots.extra ? slots.extra() : $vt(extra)}
          help={slots.help ? slots.help() : $vt(help)}
          {...others}
          {...attrs}
        >
          {slots?.default!()}
        </Form.Item>
      );
    };
  },
});

export default FormItemTsx;
