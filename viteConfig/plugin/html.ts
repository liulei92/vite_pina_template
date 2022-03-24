/*
 * @Description: html
 * @Date: 2022-03-24 14:52:33
 * @Author: LeiLiu
 */
import { createHtmlPlugin } from 'vite-plugin-html'; // https://github.com/anncwb/vite-plugin-html
import { APP_MODEL } from '../constant';

/**
 *  注入环境变量到html模板中
 *  如在  .env文件中有环境变量  APP_MODEL=admin
 *  则在 html模板中  可以这样获取  <%- APP_MODEL %>
 *  文档： https://github.com/anncwb/vite-plugin-html
 */
export function configHtmlPlugin() {
  return createHtmlPlugin({
    inject: {
      data: { APP_MODEL },
    },
    minify: true,
  });
}
