/*
 * @Description: store.d
 * @Date: 2022-03-24 16:16:10
 * @Author: LeiLiu
 */
import { PageResult, InfoResult } from '@/apis/common';
import { VNode } from 'vue';

// 由于import 一些属性，则 StoreTypes 需要 global 包裹 暴露至global
declare global {
  declare namespace StoreTypes {
    export interface CommonTypes {
      pageOneTotal: number;
      pageOneList: PageResult[];
      info: Partial<InfoResult>;
      language?: string;
      userInfo: {
        userId?: string;
        username?: string;
        token?: string;
        [key: string]: any;
      } | null;
      token?: string;
      wholeSpin: {
        spinning: boolean;
        tip?: string | VNode;
        delay?: number;
      };
    }

    export interface CountTypes {
      count: number;
    }
  }
}
