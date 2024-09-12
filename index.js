import { watch, readFile, writeFile } from 'fs';
import chineseConv from 'chinese-conv';

export default function vitePluginZhConverter(options = {}) {
  const { inputPath = 'src/locales/zh-CN.ts', outputPath = 'src/locales/zh-TW.ts' } = options;

  return {
    name: 'vite-plugin-zh-converter',
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
            const traditionalText = chineseConv.toTraditional(data);
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
