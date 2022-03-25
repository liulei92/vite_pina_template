/*
 * @Description: user
 * @Date: 2022-03-25 14:55:01
 * @Author: LeiLiu
 */
import { get, post } from '@/utils/http';

enum URL {
  login = '/v1/user/login',
  permission = '/v1/user/permission',
}

interface LoginReqParams {
  mobile: string;
  password: string;
}

interface LoginResult {
  login_status: number;
  st: string;
  token: string;
}

const login = async (data: LoginReqParams) => post<LoginResult>({ url: URL.login, data });

interface PermissionReqParams {
  auths: string[];
  modules: string[];
  is_admin?: 0 | 1;
}

const permission = async () => get<PermissionReqParams>({ url: URL.permission });

export { login, permission };
export type { LoginReqParams, LoginResult, PermissionReqParams };
