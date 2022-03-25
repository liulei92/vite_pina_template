/*
 * @Description: tools
 * @Date: 2022-03-25 14:41:35
 * @Author: LeiLiu
 */
import dayjs from 'dayjs';
import type { App, Plugin } from 'vue';

/**
 * 获取url参数
 * @param param string 参数名
 * @returns
 */
export function getQueryString(param: any) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
  const r =
    window.location.search.split('?').length > 1
      ? window.location.search.split('?')[1].match(reg)
      : null;
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * 日期补零
 * @param {number} n
 * @returns
 */
export function zeroPad(n: number | string) {
  return n.toString().padStart(2, '0');
  // return String(n < 10 ? "0" + n : n);
}

/**
 * 首字母大写
 * @param {string} str
 * @returns
 */
export function firstToUpper(str: string): string {
  // word[0].toUpperCase() + word.substr(1)
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}

/**
 * 正则表达式转义所有特殊符号 特殊符号包括 \ $ ( ) * + . [ ] ? ^ { } | -
 * @param {string} regex
 * @returns
 */
export function escapeSpecialSymbols(regex: string) {
  const map = new Map([
    ['\\', /\\/g],
    ['$', /\$/g],
    ['(', /\(/g],
    [')', /\)/g],
    ['*', /\*/g],
    ['+', /\+/g],
    ['.', /\./g],
    ['[', /\[/g],
    [']', /\]/g],
    ['?', /\?/g],
    ['^', /\^/g],
    ['{', /\{/g],
    ['}', /\}/g],
    ['|', /\|/g],
    ['-', /\-/g],
  ]);
  for (const key of map.keys()) {
    regex = regex.replace(map.get(key) as string | RegExp, '\\' + key);
  }
  return regex;
}

/**
 * 格式化毫秒级时间戳为可读格式 *** days, *** hours, *** minutes, *** seconds, *** milliseconds
 * @param {number} s 秒级
 * @returns
 */
export const formatDuration = (s: number) => {
  if (s === undefined) return '-';
  if (s < 0) s = -s;
  // const time = {
  //   day: Math.floor(ms / 86400000),
  //   hour: Math.floor(ms / 3600000) % 24,
  //   minute: Math.floor(ms / 60000) % 60,
  //   second: Math.floor(ms / 1000) % 60,
  //   millisecond: Math.floor(ms) % 1000
  // };
  // return Object.entries(time).filter(val => val[1] !== 0).map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`).join(",");
  const time = {
    d: Math.floor(s / 86400),
    h: Math.floor(s / 3600) % 24,
    min: Math.floor(s / 60) % 60,
  };
  return (
    Object.entries(time)
      .filter((val) => val[1] !== 0)
      .map(([key, val]) => `${val}${key}`)
      .join(' ') || `${s}s`
  );
};

function _arrayBufferToBase64(buffer: any) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

/**
 * 上传文件转化为text | buffer
 * @param {any} file
 * @param binary
 * @returns
 */
export function fileToText(file: any, binary = false) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    binary ? reader.readAsArrayBuffer(file) : reader.readAsText(file);
    reader.onload = (e) => {
      try {
        const r = binary ? _arrayBufferToBase64(e.target?.result) : e.target?.result;
        resolve(r);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (e) => {
      reject(e);
    };
  });
}

/**
 * 转换时间戳to字符串
 * @param {number} time
 * @param {string} format
 * @returns
 */
export function formartTime(time: number, format = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs(time * 1000).format(format);
}

/**
 * byte formatting like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 * @returns
 */
export function byteFormatter(num = 0, digits = 2) {
  const si = [
    { value: 1024 ** 6, symbol: 'EB' },
    { value: 1024 ** 5, symbol: 'PB' },
    { value: 1024 ** 4, symbol: 'TB' },
    { value: 1024 ** 3, symbol: 'GB' },
    { value: 1024 ** 2, symbol: 'MB' },
    { value: 1024, symbol: 'KB' },
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      );
    }
  }
  return num.toString() + 'B';
}

/**
 * 获取字符串字节长度 非英文字母数字符号 +1， 其他 +2
 * @param {string} val
 * @returns {number}
 */
export function getStrLength(val: string) {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    const code = val.charCodeAt(i);
    if (code >= 0 && code <= 128) len += 1;
    else len += 2;
  }
  return len;
}

/**
 * 打开window
 * @param {string} url
 * @param {any} opt
 */
export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

/**
 * 注册 组件和属性
 * @param component
 * @param alias
 * @returns
 */
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};
