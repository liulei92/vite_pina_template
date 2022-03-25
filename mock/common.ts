/*
 * @Description: common
 * @Date: 2022-03-25 15:45:35
 * @Author: LeiLiu
 */
import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

const list = Mock.mock({
  'items|60': [
    {
      id: '@id',
      url: '@url',
      ip: '@ip',
      protocol: '@protocol',
      'host|1': [80, 443],
      domain: '@domain',
      email: '@email',
    },
  ],
});

export default [
  {
    url: '/v1/common/page_one/list',
    method: 'get',
    response: () => {
      const items = list.items;
      return {
        code: 0,
        result: {
          total: items.length,
          list: items,
        },
      };
    },
  },
] as MockMethod[];
