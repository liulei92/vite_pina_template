/*
 * @Description: svgIcons
 * @Date: 2022-03-24 14:54:14
 * @Author: LeiLiu
 */
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

/**
 *  把src/icons 下的所有svg 自动加载到body下，供组件使用
 *  类似于webpack中的svg-sprite-loader
 *  文档：https://github.com/anncwb/vite-plugin-svg-icons
 */
export function configSvgIconsPlugin() {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: '[name]', // demo icon-[dir]-[name]
  });
}
