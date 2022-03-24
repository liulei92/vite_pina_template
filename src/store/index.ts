/*
 * @Description: pinia
 * @Date: 2022-03-24 16:08:54
 * @Author: LeiLiu
 */
import { createPinia } from 'pinia';

const store = createPinia();

export { store };

// 因为 pinia的实现也是通过vue的各种api（ref/reactive/computed等）
// 所以，不要求一定要在Vue上挂载注册，可以随便在组件中使用，组件外使用也有对应方案
// 不过，app.use(store) 可以把store实例挂载到Vue上使用

// https://pinia.vuejs.org/core-concepts/#using-the-store
// const store = useStore()
// // ❌ This won't work because it breaks reactivity
// // it's the same as destructuring from `props`
// const { name, doubleCount } = store
// you can use:
// 1.computed(() => store.a)
// 2.{ a } = storeToRefs(store)
