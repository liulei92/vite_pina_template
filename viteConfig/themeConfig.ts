/*
 * @Description: themeConfig.ts
 * @Date: 2022-03-24 14:29:01
 * @Author: LeiLiu
 */
export const vars = {
  '$primary-color': '#3d77ff',
  '$error-bg-color': '#ffecec',
  '$error-text-color': '#ef2929',
  '$success-bg-color': '#e7fae7',
  '$success-text-color': '#1db740',
  '$warning-bg-color': '#fef0e4',
  '$warning-text-color': '#f88930',
  '$info-bg-color': '#e5efff',
  '$info-text-color': '#3d77ff',
  '$border-base-color': '#DDDFE4',
  '$border-radius-base': '4px',
};

export function configTheme() {
  return {
    less: {
      modifyVars: {
        'primary-color': vars['$primary-color'],
        'border-radius-base': vars['$border-radius-base'],
        'btn-border-radius-base': vars['$border-radius-base'],
        'btn-disable-bg': 'rgba(85,98,123,0.06)',
      },
      javascriptEnabled: true,
    },
    scss: {
      additionalData: `
      @use 'sass:math';
      ${Object.keys(vars)
        .map((k) => `${k}: ${vars[k]};`)
        .join('\n')};
      @import "src/assets/scss/mymixin.scss";
      @import "src/assets/scss/rtl.scss";`,
      // 或 @use './src/assets/scss/vars.scss'
      charset: false, // vite2打包出现警告，"@charset" must be the first，消除 https://github.com/element-plus/element-plus/issues/3219
    },
  };
}
