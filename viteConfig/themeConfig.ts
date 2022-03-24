/*
 * @Description: themeConfig.ts
 * @Date: 2022-03-24 14:29:01
 * @Author: LeiLiu
 */
export function configThemeConfig() {
  return {
    less: {
      modifyVars: {
        'primary-color': '#3D77FF',
        'border-radius-base': '4px',
        'btn-border-radius-base': '4px',
        'btn-disable-bg': 'rgba(85,98,123,0.06)',
      },
      javascriptEnabled: true,
    },
    scss: {
      additionalData: `
      @use 'sass:math';
      @import "src/assets/scss/vars.scss";
      @import "src/assets/scss/mymixin.scss";
      `,
      // 或 @use './src/assets/styles/var.scss'
      charset: false, // vite2打包出现警告，"@charset" must be the first，消除 https://github.com/element-plus/element-plus/issues/3219
    },
  };
}
