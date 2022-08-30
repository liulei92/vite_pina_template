/*
 * @Description: useMessage.tsx
 * @Date: 2022-03-29 10:45:38
 * @Author: LeiLiu
 */
import { Modal, message as Message, notification } from 'ant-design-vue/es';
import type { ModalFuncProps } from 'ant-design-vue/es/modal/Modal';
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue';

import { isString, isFunction } from '@/utils/is';

export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType?: IconType;
}
export type ModalOptionsPartial = RequireKey<ModalOptionsEx, 'content'>;

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled class="modal-icon-warning" />;
  } else if (iconType === 'success') {
    return <CheckCircleFilled class="modal-icon-success" />;
  } else if (iconType === 'info') {
    return <InfoCircleFilled class="modal-icon-info" />;
  } else {
    return <CloseCircleFilled class="modal-icon-error" />;
  }
}

function renderContent({ content }: ModalOptionsEx) {
  if (isString(content)) return <div innerHTML={`<div>${content}</div>`}></div>;
  else if (isFunction(content)) return content();
  else content;
}

/**
 * @description: Create confirmation box
 */
function createConfirm(options: ModalOptionsPartial) {
  const iconType = options.iconType || 'warning';
  Reflect.deleteProperty(options, 'iconType');
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    ...options,
    content: renderContent(options),
  };
  return Modal.confirm(opt);
}

const getBaseOptions = () => {
  return {
    okText: 'OK',
    centered: true,
  };
};

function createModalOptions(options: ModalOptionsPartial, icon: string) {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  };
}

function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'));
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'close'));
}

function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'));
}

function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'));
}

notification.config({
  placement: 'topRight',
  duration: 3,
});

/**
 * @description: message(notification, modal)
 */
export function useMessage() {
  return {
    notification,
    Message,
    createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  };
}
