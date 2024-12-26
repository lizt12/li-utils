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
### arrayToTreeConversion：数组结构转树形结构。接收四个参数，返回树形结构
- 原始数据（一维数组）
- 父节点对应的字段名（默认为parentId）
- 元素的唯一标识名（默认为id）
- 子元素存储使用字段名（默认为children）

### treeToArrConversion：树形结构转数组结构。接收五个参数，返回一维数组
- 原始数据（数组或对象）
- 子节点的字段名（默认为children）
- 存储和父节点对应关系的字段名（不传则不会新增此字段）
- 元素的唯一标识名（默认为id）
- 是否删除子集（默认为 true）

### findItem：寻找指定元素。接收四个参数，返回对象或一维数组
- 原始数据（数组或对象）
- 回调函数（参数为当前元素，返回true代表为此元素）
- 返回值类型（【alone】代表只返回该元素，【arr】代表返回该元素和所有的父级元素。默认为 alone）
- 子节点字段名（默认值为 children）

### treeFiltering：过滤元素。接收三个参数，返回树形结构
- 原始数据（数组或对象）
- 回调函数（参数为当前元素，返回true则保留，false则过滤）
- 子节点字段名（默认值为 children）

### accAdd：加法，接收两个参数，返回两数相加的结果
### accSub：减法，接收两个参数，返回两数相减的结果
### accMul：乘法，接收两个参数，返回两数相乘的结果
### accDiv：除法，接收两个参数，返回两数相除的结果