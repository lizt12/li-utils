## 安装
```shell
npm install li-zt-utils
```

## 使用
```shell
import { tree, operation } from 'li-zt-utils'

import { arrayToTreeConversion, treeToArrConversion, findItem, treeFiltering } from 'li-zt-utils/dist/tree'

import { accAdd, accSub, accMul, accDiv } from 'li-zt-utils/dist/operation'
```

## API说明
### arrayToTreeConversion：数组结构转树形结构。
- 接收四个参数：
- 原始数据（一维数组）
- 父节点对应的字段名（默认为parentId）
- 元素的唯一标识名（默认为id）
- 子元素存储使用字段名（默认为children）