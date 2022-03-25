/*
 * @Description: compress
 * @Date: 2022-03-24 14:53:14
 * @Author: LeiLiu
 */
import compressPlugin from 'vite-plugin-compression';
import { FIT } from '../constant';

export function configCompressPlugin() {
  if (FIT.includes('2')) {
    return compressPlugin({
      verbose: true, // 是否在控制台输出压缩结果
      disable: false,
      threshold: 0, // 10240
      filter: /\.(js|mjs|css)$/i, // /\.(js|mjs|json|css|html)$/i
      algorithm: 'gzip',
      ext: '.gz', // 生成的压缩包后缀
      deleteOriginFile: false,
    });
  }
  return false;
}
