/*
 * @Description: common
 * @Date: 2022-03-25 15:53:56
 * @Author: LeiLiu
 */
import { get } from '@/utils/http';

enum URL {
  page_one_list = '/v1/common/page_one/list',
}

interface PageReqParams {
  limit: number;
  page: number;
}

interface PageResult {
  id: number;
  url: string;
  ip: string;
  protocol: string;
  host: number;
  domain: string;
  email: string;
}

const page_one_list = async (params: PageReqParams) =>
  get<PageResult>({ url: URL.page_one_list, params });

export { page_one_list };
export type { PageReqParams, PageResult };
