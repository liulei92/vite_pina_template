/*
 * @Description: store.d
 * @Date: 2022-03-24 16:16:10
 * @Author: LeiLiu
 */
declare namespace StoreTypes {
  export interface CommonTypes {
    token: string;
    userInfo: {
      userName?: string;
    };
  }

  export interface CountTypes {
    count: number;
  }
}
