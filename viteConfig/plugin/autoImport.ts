/*
 * @Description: autoImport
 * @Date: 2022-03-24 15:09:40
 * @Author: LeiLiu
 */
import AutoImport from 'unplugin-auto-import/vite';

export const configAutoImportDeps = () =>
  AutoImport({
    imports: ['vue', 'vue-router'],
    dts: 'src/auto-imports.d.ts',
  });
