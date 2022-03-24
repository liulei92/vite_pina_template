/*
 * @Description: analysis
 * @Date: 2022-03-24 14:53:53
 * @Author: LeiLiu
 */
import visualizer from 'rollup-plugin-visualizer';
import { ANALY } from '../constant';

export function configVisualizerPlugin() {
  if (ANALY) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return false;
}
