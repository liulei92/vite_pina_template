/*
 * @Description: useRefs 获取当前组件实例的 refs
 * @Date: 2020-12-26 14:04:09
 * @Author: LeiLiu
 */
export function useRefs() {
  const refs = ref<Record<string, unknown>>({});

  onMounted(() => {
    const instance = getCurrentInstance()!;
    refs.value = instance.refs;
  });

  function getRef<T>(name: string): T {
    return (refs.value[name] || undefined) as T;
  }

  return {
    refs,
    getRef,
  };
}
