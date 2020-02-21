import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const basename = pkg.name.split('.').pop()
const normalFileName = `dist/${basename}.js`
const output = {
  name: basename,
  file: pkg.browser,
  format: 'umd'
}

export default [
  // browser-friendly UMD build
  {
    input: pkg.entry,
    output: {
      ...output,
      file: normalFileName
    },
    plugins: [
      resolve(),
      commonjs(),
      babel()
    ]
  },
  // browser-friendly UMD build mini file
  {
    input: pkg.entry,
    output,
    plugins: [
      resolve(),
      commonjs(),
      babel(),
      terser()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: pkg.entry,
    external: [],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ]
  }
]
