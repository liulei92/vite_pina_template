/*
 * @Description: http
 * @Date: 2022-03-25 14:16:31
 * @Author: LeiLiu
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_PREFIX } from '../../viteConfig/constant';

// baseURL
const BASE_URL = import.meta.env.MODE === 'development' ? API_PREFIX : '';

const instance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, 跨域请求设置
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  },
  // x-www-form-urlencoded data需进行格式化
  // transformRequest: [function(data) { // 对 data 进行任意转换处理，只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  //   return qs.stringify(data);
  // }]
});

instance.interceptors.request.use(
  (config) => {
    // if no permission
    // return Promise.reject('没有操作权限');

    // 设置 config
    // config.headers = { ...config.headers, ...others };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const res = response.data as ResData<any>; // 可指定 type
    const { code, message, result } = res;
    if (![0, 200].includes(code)) {
      // todo 分类 code
      return Promise.reject(message);
    }
    return result;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const _default = <T = any>(
  config: AxiosRequestConfig,
  options: AxiosRequestConfig = {},
): Promise<T> => {
  if (typeof config === 'string') {
    return instance.request<T, T>({
      url: config,
      ...options,
    });
  } else {
    return instance.request<T, T>(config);
  }
};

function get<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return _default({ ...config, method: 'GET' }, options);
}

function post<T = any>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> {
  return _default({ ...config, method: 'POST' }, options);
}

export { _default as default, get, post };
export type { AxiosInstance, AxiosResponse };
