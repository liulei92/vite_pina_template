/*
 * @Description: global.d.ts
 * @Date: 2022-03-24 15:20:04
 * @Author: LeiLiu
 */
import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from 'vue';
declare global {
  // vue
  declare type PropType<T> = VuePropType<T>;
  declare type VueNode = VNodeChild | JSX.Element;

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  // 必填K
  declare type RequireKey<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: T[P];
  };

  // 联合类型转元祖
  declare type isNever<T> = [T] extends [never] ? true : false;

  declare type UnionToIntersection<T> = (T extends any ? (x: T) => void : never) extends (
    x: infer R,
  ) => void
    ? R
    : never;

  declare type LastOfUnion<T> = UnionToIntersection<
    T extends any ? (x: T) => void : never
  > extends (x: infer L) => void
    ? L
    : never;

  declare type UnionToTuple<T, R extends any[] = []> = isNever<T> extends true
    ? R
    : UnionToTuple<Exclude<T, LastOfUnion<T>>, [LastOfUnion<T>, ...R]>;

  // RequireTupleOne<T, K[]> 的作用就是递归的将K[]的key用联合类型联合起来，相当于：
  // RequireTupleOne<V, ['a', 'b', 'c']> = RequireKey<V, 'a'> | RequireKey<V, 'b'> | RequireKey<V, 'c'>
  declare type RequireTupleOne<
    T,
    K extends any[],
    R extends any[] = [],
  > = R['length'] extends K['length']
    ? never
    : RequireKey<V, K[R['length']]> | RequireTupleOne<T, K, [...R, 1]>;

  // 必选T其中一个
  declare type RequireAllOne<T> = RequireTupleOne<T, UnionToTuple<keyof T>>;

  declare interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  declare interface ViteEnv {
    API_BASE_URL: string;
  }

  declare interface ResData<T> {
    code: number;
    message: string;
    result: T;
  }

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new (): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}

// typescript获取函数的参数类型
// type ArrType = Parameters<typeof updata>
// ArrType => [state: any]

// 获取函数的返回值类型
// type Return = ReturnType<typeof update>;
// ReturnType =>
// {
//     router: any;
//}
