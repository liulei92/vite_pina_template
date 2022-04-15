/*
 * @Description: useFormConfig
 * @Date: 2022-04-15 16:06:39
 * @Author: LeiLiu
 */
import { ref, computed } from 'vue';
import { Form } from 'ant-design-vue';
import type { FormInstance } from 'ant-design-vue';

const useForm = Form.useForm;
type Types = Parameters<typeof useForm>;

export const useFormConfig = (...args: Types) => {
  const formRef = ref<FormInstance>();
  const [modelRef, rulesRef = {}, options = {}] = args;
  const {
    initialModel,
    validateInfos,
    resetFields,
    validate,
    validateField,
    mergeValidateInfo,
    clearValidate,
  } = useForm(modelRef, rulesRef, options);

  /**
   * toArray validateInfos
   */
  const errorInfos = computed(() => {
    return mergeValidateInfo(toArray(validateInfos));
  });

  /**
   * 原始值，非初始值
   */
  const originalModel = ref<Recordable<any>>(cloneDeep(modelRef!));

  /**
   * 更新原始值
   * @param val
   */
  const updateOriginalModel = (val: Recordable<any>) => {
    originalModel.value = cloneDeep(val);
  };

  /**
   * 重置Fields为原始值
   */
  const resetOriginalFields = () => {
    resetFields();
    for (const key in modelRef) {
      modelRef[key] =
        typeof originalModel.value[key] === 'object'
          ? cloneDeep(originalModel.value[key])
          : originalModel.value[key];
    }
  };

  /**
   * 更新model，并依据条件更新原始值
   * @param val
   * @param original
   */
  const updateModel = (val: Recordable<any>, original = false) => {
    for (const key in val) {
      modelRef![key] = typeof val[key] === 'object' ? cloneDeep(val[key]) : val[key];
    }
    original && updateOriginalModel(val);
  };

  return {
    formRef,
    initialModel,
    validateInfos,
    resetFields,
    // useForm的问题：validate会将hidden的值也会返回
    validate,
    validateField,
    mergeValidateInfo,
    clearValidate,
    errorInfos,
    originalModel,
    updateOriginalModel,
    resetOriginalFields,
    updateModel,
  };
};
