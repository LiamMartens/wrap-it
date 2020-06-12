const commonjs = require('@rollup/plugin-commonjs');
const ts = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve').default;
const { babel } = require('@rollup/plugin-babel');

const plugins = [
  resolve({
    preferBuiltins: false,
    browser: true,
  }),
  commonjs(),
  babel({
    babelHelpers: 'bundled'
  })
];

module.exports = [{
  input: './src/index.ts',
  output: {
    file: './lib/index.js',
    format: 'commonjs'
  },
  plugins: [
    ...plugins,
    ts()
  ],
}]