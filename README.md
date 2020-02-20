---
## 编码要求

编码规范遵循 standard代码规范。代码块请按照功能模块分目录

```bash
├── LICENSE
├── README.md
├── build
├── dist
├── examples
├── node_modules
├── package.json
├── src
|   ├── util
├   ├── detector.js
├   ├── index.js
├   └── validators
└── yarn.lock
```

## 运行

依赖请使用yarn安装 若国内比较慢，使用cyarn安装。不推荐npm，npm会导致包版本升级出现不必要的错误
```bash
yarn
```
然后在项目中修改测试，完了之后打包，提交到github上。

```bash
yarn build
```
## 使用

### 在前端使用

```javascript
yarn nstall hexyun/helpers -D
import helpers  from 'helpers'
console.log(helpers)
```
### 在后端使用

```javascript
yarn install hexyun/helpers -D
const helpers = require('helppers')
console.log(helpers)
```

### 在输出端使用
如果觉得慢， 请把资源同步到seed 或 oss上。更换地址即可。
```javascript

<script src="https://raw.githubusercontent.com/hexyun/helpers/master/dist/helpers.min.js"></script>

```
