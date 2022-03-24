/*
 * @Description: rollupConfig.ts
 * @Date: 2022-03-24 14:49:37
 * @Author: LeiLiu
 */
// https://juejin.cn/post/7041188884864040991#heading-18
const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['ant-design-vue', '@ant-design'],
    output: '@antd',
  },
  {
    match: ['@antv', 'd3'],
    output: '@antv',
  },
];
const srcLibs: { match: string[]; output: string }[] = [
  {
    match: ['components/Form/src'],
    output: 'form-items',
  },
];

export function configManualChunk(id: string) {
  if (/(.*)\/node_modules\/(.*)/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : '@vendor';
  } else if (/(.*)\/src\/(.*)/.test(id)) {
    const matchItem = srcLibs.find((item) => {
      const reg = new RegExp(`[\\/]src[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
}
