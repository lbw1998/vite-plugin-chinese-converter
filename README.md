# vite-plugin-chinese-converter [![](https://badge.fury.io/js/vite-plugin-chinese-converter.svg)](https://www.npmjs.com/package/vite-plugin-chinese-converter)
自动监听国际化项目中的中文文件并生成新的繁/简体文件。

**Import vite-plugin-chinese-converter in Node.js script**

```bash
yarn add vite-plugin-chinese-converter -D
# or
npm i vite-plugin-chinese-converter -D
# or
pnpm add vite-plugin-chinese-converter -D
```

```javascript
// vite.config.js
import vitePluginChineseConverter from 'vite-plugin-chinese-converter';

export default ():  => {
  return {
    plugins: [
      vue(),
      vitePluginChineseConverter(),
    ],
  }
}
```
- vitePluginChineseConverter 配置

```ts
{
    inputPath?: string;
    outputPath?: string;
    from?: string;
    to?: string;
}
```

### inputPath

**type:** string

**default:** `src/locales/zh-CN.ts`

设置需要监听和被转换的文件路径

### outputPath

**type:** string

**default:** `src/locales/zh-TW.ts`

设置转换后生成的文件路径

### from

**type:** string

**default:** `cn`

设置输入文件的语言

### to

**type:** string

**default:** `hk`

设置输出文件的语言

- `cn`: 简体中文（中国大陆）
- `tw`: 繁体中文（台湾）
    - `twp`: 且转换词汇（例如：自行車 -> 腳踏車）
- `hk`: 繁体中文（香港）
- `jp`: 日本新字体
- `t`: 繁体中文（OpenCC 标准。除非你知道自己在做什么，否则请勿使用）
