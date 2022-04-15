/*
 * @Description: common
 * @Date: 2022-03-25 15:53:56
 * @Author: LeiLiu
 */
import { get } from '@/utils/http';

enum URL {
  page_one_list = '/v1/common/page_one/list',
  info = '/v1/common/info',
  testForm = '/v1/common/testForm',
}

export interface PageReqParams {
  limit: number;
  page: number;
}

export interface PageResult {
  id: number;
  url: string;
  ip: string;
  protocol: string;
  host: number;
  domain: string;
  email: string;
}

export const page_one_list = async (params: PageReqParams) =>
  get<{ total: number; list: PageResult[] }>({ url: URL.page_one_list, params });

export interface InfoResult {
  prroductName: string;
  developer: string;
  email: string;
}
export const info = async () => get<InfoResult>(URL.info);

export interface TestFormResult {
  id: string;
  phone: string;
  select: string;
  fulij: string;
}
export const testForm = async () => get<TestFormResult>(URL.testForm);
