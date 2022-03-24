/*
 * @Description: legacy
 * @Date: 2022-03-24 14:52:58
 * @Author: LeiLiu
 */
import legacy from '@vitejs/plugin-legacy';
import { FIT } from '../constant';

export function configLegacyPlugin() {
  if (FIT.includes('1')) {
    return legacy({
      // targets: ["defaults", "not IE 11"]
      targets: ['chrome 76'], // 需要兼容的目标列表，可以设置多个
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向IE11时需要此插件
    });
  }
  return false;
}
