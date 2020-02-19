var fs = require('fs')
var path = require('path')
// var zlib = require('zlib')
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var replace = require('rollup-plugin-replace')
var mainPackage = require('../mainPackage.json')
var name = mainPackage.name
var mainPath = resolvePath('../src/index.js')
var standard = require('rollup-plugin-standard')

const moduleName = name.replace(/-([a-z])/g, ($0, $1) => $1.toUpperCase())
const banner = `/*!
 * ${name} v${mainPackage.version}
 * (c) ${new Date().getFullYear()} ${mainPackage.author}
 * Released under the ${mainPackage.license} License.
 */
`
// common js
rollup.rollup({
  input: mainPath,
  plugins: [
    standard(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}).then((bundle) => {
  console.log(yellow('start building'))
  return bundle.generate({
    format: 'cjs',
    banner: banner
  }).then(res => {
    write(resolvePath(`../dist/${name}.common.js`), res.output[0].code)
  })
}).then(() => {
  return rollup.rollup({
    input: mainPath,
    plugins: [
      standard(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      babel()
    ]
  }).then((bundle) => {
    return bundle.generate({
      format: 'esm',
      banner: banner,
      moduleName: moduleName,
      name: moduleName
    }).then(res => write(resolvePath(`../dist/${name}.esm.js`), res.output[0].code))
  })
}).then(() => {
  return rollup.rollup({
    input: mainPath,
    plugins: [
      standard(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      babel()
    ]
  }).then((bundle) => {
    return bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: moduleName,
      name: moduleName
    }).then(res => write(resolvePath(`../dist/${name}.js`), res.output[0].code))
  })
}).then(function () {
  return rollup.rollup({
    input: mainPath,
    plugins: [
      standard(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      babel()
    ]
  }).then((bundle) => {
    bundle.generate({
      format: 'umd',
      moduleName: moduleName,
      banner: banner,
      name: moduleName
    }).then(r => {
      let code = r.output[0].code
      var res = uglify.minify(code, {
        fromString: true,
        outSourceMap: `${name}.min.js.map`,
        output: {
          preamble: banner,
          ascii_only: true
        }
      })
      // fix uglifyjs sourcemap
      var map = JSON.parse(res.map)
      map.sources = [`${name}.js`]
      map.sourcesContent = [code]
      map.file = `${name}.min.js`
      return [
        write(resolvePath(`../dist/${name}.min.js`), res.code),
        write(resolvePath(`../dist/${name}.min.js.map`), JSON.stringify(map))
      ]
    })
  })
}).catch(logError)

// htmlMin('./demo/index.html', './dist/index.html')

function resolvePath (_path) {
  return path.resolve(__dirname, _path)
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

// function zip () {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(`dist/${name}.min.js`, function (err, buf) {
//       if (err) return reject(err)
//       zlib.gzip(buf, function (err, buf) {
//         if (err) return reject(err)
//         write(`dist/${name}.min.js.gz`, buf).then(resolve)
//       })
//     })
//   })
// }

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e.stack)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
function yellow (str) {
  return '\x1b[1m\x1b[33m' + str + '\x1b[39m\x1b[22m'
}
