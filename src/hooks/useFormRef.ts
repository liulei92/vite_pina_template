/*
 * @Description: useFormRef
 * @Date: 2022-04-15 18:04:00
 * @Author: LeiLiu
 */
// import { Form } from 'ant-design-vue';
import type { RuleObject, FormProps, FormInstance } from 'ant-design-vue/es/form';
import { useInjectForm } from 'ant-design-vue/es/form/context';
import { useCommonStore } from '@/store/modules/common';

// export function useProvideFormElRef(name = "formElRef") {
//   const formElRef = ref<FormInstance>();

//   provide(name, formElRef);

//   return { ref: formElRef, name };
// }

export function useInjectFormRef() {
  const { name = 'formRef' } = useInjectForm();

  if (unref(name)) return inject<FormInstance>(unref(name));
  else return undefined;
}

export function useFormRef<T extends object>(
  defaultValue: T,
  rules: Recordable<RuleObject | RuleObject[]> = {},
  options: FormProps = {},
) {
  const formRef = ref<FormInstance>();
  const state = reactive({
    model: cloneDeep(defaultValue),
    rules: cloneDeep(rules),
  });
  const { name = 'formRef', ...others } = options;

  provide(name, formRef);

  /**
   * 原始值，非初始值
   */
  const originalModel = ref(cloneDeep(defaultValue));

  /**
   * 更新原始值
   * @param val
   */
  const updateOriginalModel = (val: Recordable<any>) => {
    originalModel.value = cloneDeep(val);
  };

  /**
   * 更新model，并依据条件更新原始值
   * @param val
   * @param original
   */
  const updateModel = (val: Recordable<any>, original = false) => {
    for (const key in val) {
      state.model![key] = typeof val[key] === 'object' ? cloneDeep(val[key]) : val[key];
    }
    original && updateOriginalModel(val);
  };

  /**
   * 重置Fields为原始值
   */
  const resetOriginalFields = () => {
    unref(formRef)!.resetFields();
    for (const key in state.model) {
      state.model[key] =
        typeof originalModel.value[key] === 'object'
          ? cloneDeep(originalModel.value[key])
          : originalModel.value[key];
    }
  };

  const { setWholeSpin } = useCommonStore();

  /**
   * 初始化Form
   * @param hook
   * @param config
   * @returns
   */
  const initForm = (hook: () => any, config: { immediate?: boolean; spin?: boolean } = {}) => {
    const { immediate = true, spin = true } = config;
    const core = async () => {
      spin && setWholeSpin({ spinning: !0, tip: 'loading...' });
      await hook();
      spin &&
        useTimeoutFn(() => {
          setWholeSpin(!1);
        }, 150);
    };
    immediate && core();

    return { reinit: core };
  };

  /**
   * 提交Form
   * @param hook
   * @param errorHook
   */
  const submitForm = () => {
    const { validate } = unref(formRef)!;
    return new Promise<Partial<T>>((resolve, reject) => {
      setWholeSpin({ spinning: !0, tip: 'submiting...' });
      validate()
        .then((values) => resolve(values as Partial<T>))
        .catch((error) => reject(error))
        .finally(() => {
          useTimeoutFn(() => {
            setWholeSpin(!1);
          }, 150);
        });
    });
    // try {
    //   setWholeSpin({ spinning: !0, tip: 'submiting...' });
    //   const values = await validate();
    //   await hook(values as Partial<T>);
    // } catch (error) {
    //   console.log(error);
    //   errorHook && errorHook(error);
    // } finally {
    //   useTimeoutFn(() => {
    //     setWholeSpin(!1);
    //   }, 150);
    // }
  };

  return {
    ref: formRef,
    name,
    ...others,
    ...toRefs(state),
    originalModel,
    updateOriginalModel,
    updateModel,
    resetOriginalFields,
    initForm,
    submitForm,
  };
}
