/*
 * @Description: proxy
 * @Date: 2022-03-24 14:57:44
 * @Author: LeiLiu
 */
import { API_BASE_URL, API_TARGET_URL, MOCK_API_BASE_URL, MOCK_API_TARGET_URL } from './constant';
import type { ProxyOptions } from 'vite';

type ProxyTargetList = Record<string, ProxyOptions>;

export function configProxy(port: string): ProxyTargetList {
  return {
    // test
    [API_BASE_URL]: {
      target: API_TARGET_URL,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${API_BASE_URL}`), ''),
    },
    // mock
    [MOCK_API_BASE_URL]: {
      target: MOCK_API_TARGET_URL.replace('port', port),
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${MOCK_API_BASE_URL}`), '/api'),
    },
    // websocket: {
    //   target: `ws${protocol === "https" ? "s" : ""}://${VITE_WS_SERVER}`,
    //   changeOrigin: true,
    //   secure: false,
    //   ws: true,
    // },
  };
}
