/*
 * @Description: UploadItem
 * @Date: 2022-04-06 11:10:43
 * @Author: LeiLiu
 */
import type { Slot } from 'vue';
import { Form, Upload } from 'ant-design-vue';

import { FormItemProps, UploadProps, UploadItemProps } from './props';
import type { IFormItemProps, IUploadProps } from './props';
import FromItem, { FormItemSlots } from './FormItem';

// https://next.antdv.com/components/upload-cn#API
export const UploadSlots: string[] = [
  'downloadIcon',
  'iconRender',
  'itemRender',
  'previewIcon',
  'removeIcon',
];

const UploadItem = defineComponent({
  name: 'UploadItem',
  inheritAttrs: false,
  props: UploadItemProps,
  slots: [FormItemSlots, ...UploadSlots, 'render'], // render: () =>{}
  // emits: [],
  setup(props, { slots, attrs, expose }) {
    const formItemContext = Form.useInjectFormItemContext(); // 实例
    expose({
      formItemContext,
    });

    return () => {
      const formItemProps: IFormItemProps = {};
      const uploadProps: IUploadProps = {};
      const formItemSlots: Indexable<Slot> = {};
      const uploadSlots: Indexable<Slot> = {};
      for (const key in props) {
        if (key in FormItemProps) formItemProps[key] = props[key];
        if (key in UploadProps) uploadProps[key] = props[key];
        // others will need to done
      }
      for (const key in slots) {
        if (FormItemSlots.includes(key)) formItemSlots[key] = slots[key]!;
        if (UploadSlots.includes(key)) uploadSlots[key] = slots[key]!;
        // others will need to done
      }
      if (props.fileFieldName) UploadProps['name'] = props.fileFieldName;

      return (
        <FromItem {...formItemProps} {...attrs} v-slots={formItemSlots}>
          <Upload {...uploadProps} v-slots={uploadSlots}>
            {props?.render ? props?.render : slots?.render ? slots.render() : null}
          </Upload>
          {slots?.default && slots?.default()}
        </FromItem>
      );
    };
  },
});

export default UploadItem;
