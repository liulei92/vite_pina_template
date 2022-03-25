/*
 * @Description: is
 * @Date: 2022-03-25 14:33:16
 * @Author: LeiLiu
 */
const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object');
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date');
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number');
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window');
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName;
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map');
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * 判断是否是奇数
 * @param x string | number
 */
export function isOdd(x: string | number) {
  if (isNaN(x as number)) {
    return false;
  }
  return (x as number) % 2 === 1;
}

/**
 * 判断是否是偶数
 * @param x string | number
 */
export function isEven(x: string | number) {
  if (isNaN(x as number)) {
    return false;
  }
  return (x as number) % 2 === 0;
}

/**
 * 判断是否是16进制字符串
 * @param {string} x
 */
export function isHex(x: string) {
  return /^([A-Fa-f1-9][A-Fa-f0-9]*|0)$/.test(x);
}

/**
 * @description 判断字符串是否是base64
 * @param {string} str
 */
export function isBase64(str: string): boolean {
  if (str === '' || str.trim() === '') {
    return false;
  }
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

/**
 * @description: 判断字符串是否是mac地址
 * @param {string} str
 */
export function isMAC(str: string) {
  return /^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/i.test(str);
}

/**
 * @param {String} str
 * @returns {Boolean}
 */
export function isJSON(str: string | null) {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str);
      return typeof obj === 'object' && obj;
    } catch (e) {
      // console.log('error：' + str + '!!!' + e)
      return false;
    }
  }
  return false;
}

/**
 * @description: 判断字符串是否是单播mac地址
 * @param {string} str
 */
export function isUnicastMAC(str: string) {
  if (isMAC(str)) {
    const f = str.split(':')[0];
    const f2 = parseInt(f, 16).toString(2);
    return f2[f2.length - 1] === '0'; // 0 为单播
  }
  return false;
}

/**
 * @description: email
 * @param {string} str
 */
export function isEmail(str: string) {
  return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
}

/**
 * 域名
 * @param {string} str
 */
export function isHost(str: string) {
  return /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(
    str,
  );
}

/**
 * @description: url
 * @param {string} str
 */
export function isUrl1(str: string, full = false) {
  if (full)
    return /^(((ht|f)tps?):\/\/)[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(str);
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(str);
}
