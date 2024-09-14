import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default defineConfig([
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.mjs',
      format: 'esm',
    },
    plugins: [resolve(), commonjs(), babel({ presets: ['@babel/preset-env'] }), terser()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    plugins: [resolve(), commonjs(), babel({ presets: ['@babel/preset-env'] }), terser()],
  },
]);
