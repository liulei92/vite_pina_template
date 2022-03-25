/*
 * @Description: mock
 * @Date: 2022-03-25 15:47:22
 * @Author: LeiLiu
 */
import { viteMockServe } from 'vite-plugin-mock';
import { LOCAL_MOCK, PROD_MOCK } from '../constant';

export function configMockPlugin() {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: LOCAL_MOCK,
    prodEnabled: PROD_MOCK, // 为了演示，线上开启 mock，实际开发请关闭，会影响打包体积
    // 开发环境无需关心
    // injectCode 只受prodEnabled影响
    // https://github.com/anncwb/vite-plugin-mock/issues/9
    // 下面这段代码会被注入 main.ts
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
 
       setupProdMockServer();
       `,
  });
}
