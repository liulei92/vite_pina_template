/*
 * @Description: free
 * @Date: 2022-03-25 16:09:56
 * @Author: LeiLiu
 */
import { get } from '@/utils/http';

enum URL {
  hotMusic1 = 'https://api.66mz8.com/api/rand.music.163.php',
}

interface HotMusicReqParams {
  format: 'json' | 'mp3';
}

interface HotMusicResult {
  artists_name: string;
  music_url: string;
  music_pic: string;
}

const hotMusic1 = async (params: HotMusicReqParams) =>
  get<HotMusicReqParams>({ url: URL.hotMusic1, params });

export { hotMusic1 };
export type { HotMusicReqParams, HotMusicResult };
