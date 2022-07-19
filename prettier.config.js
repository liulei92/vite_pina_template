/*
 * @Description: prettier.config
 * @Date: 2022-03-24 14:09:30
 * @Author: LeiLiu
 */
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用 tab 缩进，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // 首行缩进
  vueIndentScriptAndStyle: true,
  // 使用单引号代替双引号
  singleQuote: true,
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾使用逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格 { foo: bar }
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不使用默认的折行标准
  proseWrap: 'never', // preserve 默认
  // 根据严格决定 html 要不要折行
  htmlWhitespaceSensitivity: 'strict', // css 样式决定
  // 换行符使用 lf
  endOfLine: 'auto',
};
