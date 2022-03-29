/*
 * @Description: store.d
 * @Date: 2022-03-24 16:16:10
 * @Author: LeiLiu
 */
import { PageResult } from '@/apis/common';

// 由于import 一些属性，则 StoreTypes 需要 global 包裹 暴露至global
declare global {
  declare namespace StoreTypes {
    export interface CommonTypes {
      token: string;
      userInfo: {
        userName?: string;
      };
      pageOneTotal: number;
      pageOneList: PageResult[];
      language?: string;
      getUserName?: string;
    }

    export interface CountTypes {
      count: number;
    }
  }
}
