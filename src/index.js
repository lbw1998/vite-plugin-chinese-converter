import { watch, readFile, writeFile } from 'fs';
import * as OpenCC from 'opencc-js'

export default function vitePluginZhConverter(options = {}) {
  const { inputPath = 'src/locales/zh-CN.ts', outputPath = 'src/locales/zh-TW.ts', from = 'cn', to = 'hk' } = options;
  const debounceMs = 200;
  let debounceTimer = null;

  function convertAndWrite() {
    readFile(inputPath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const converter = OpenCC.Converter({ from, to });
      const traditionalText = converter(data);
      // 仅当输出文件不存在或内容与转换结果不同时才写入，避免重复写入导致 Vite 刷新循环
      readFile(outputPath, 'utf-8', (readErr, current) => {
        if (!readErr && current === traditionalText) {
          return;
        }
        writeFile(outputPath, traditionalText, (writeErr) => {
          if (writeErr) {
            console.error(writeErr);
          } else {
            console.log(`${outputPath} 文件已生成`);
          }
        });
      });
    });
  }

  return {
    name: 'vite-plugin-chinese-converter',
    buildStart() {
      watch(inputPath, (eventType) => {
        if (eventType !== 'change') return;
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          debounceTimer = null;
          convertAndWrite();
        }, debounceMs);
      });
    }
  };
}
