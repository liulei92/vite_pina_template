/*
 * @Description: pwa
 * @Date: 2022-04-27 14:54:15
 * @Author: LeiLiu
 */
import { VitePWA } from 'vite-plugin-pwa';
import { PWA_APP_TITLE, PWA_APP_SHORT_NAME } from '../constant';

export function configPwaPlugin() {
  return VitePWA({
    manifest: {
      name: PWA_APP_TITLE,
      short_name: PWA_APP_SHORT_NAME,
      icons: [
        {
          // ./表示public文件夹
          src: './img/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './img/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  });
}
