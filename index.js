import { watch, readFile, writeFile } from 'fs';
import * as OpenCC from 'opencc-js'

export default function vitePluginZhConverter(options = {}) {
  const { inputPath = 'src/locales/zh-CN.ts', outputPath = 'src/locales/zh-TW.ts', from = 'cn', to ='hk' } = options;

  return {
    name: 'vite-plugin-chinese-converter',
    buildStart() {
      // 监听指定的输入文件
      watch(inputPath, (eventType) => {
        if (eventType === 'change') {
          // 读取文件内容
          readFile(inputPath, 'utf-8', (err, data) => {
            if (err) {
              console.error(err);
              return;
            }
            // 转换简体字为繁体字
            const converter = OpenCC.Converter({ from, to })
            const traditionalText = converter(data);
            // 生成指定的输出文件
            writeFile(outputPath, traditionalText, (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log(`${outputPath} 文件已生成`);
              }
            });
          });
        }
      });
    }
  };
}
