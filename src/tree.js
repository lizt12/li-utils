/**
 * 数组结构转树形结构
 * @param {*} arr 原始数据，需是一维数组
 * @param {*} parentKey 父节点对应的字段名。默认为 parentId
 * @param {*} itemKey 元素的唯一标识名，需要保证和子元素的父节点一致。默认为 id
 * @param {*} childrenKey 子元素存储的字段名。默认为children
 * @returns 树形结构
 */
function arrayToTreeConversion(arr, parentKey, itemKey, childrenKey) {
  if (arr == []) {
    return [];
  }
  if (!Array.isArray(arr)) {
    throw new Error("请传入数组");
  }
  if (arr.length === 0) {
    return [];
  }
  parentKey = parentKey || "parentId";
  itemKey = itemKey || "id";
  childrenKey = childrenKey || "children";
  const itemMap = new Map();
  const tree = [];
  arr.forEach((item) => {
    itemMap.set(item[itemKey], item);
  });
  arr.forEach((item) => {
    if (item[parentKey]) {
      const i = itemMap.get(item[parentKey]);
      if (i) {
        if (i[childrenKey]) {
          i[childrenKey].push(item);
        } else {
          i[childrenKey] = [item];
        }
      } else {
        tree.push(item);
      }
    } else {
      tree.push(item);
    }
  });
  return tree;
}

/**
 * 树形结构转数组结构
 * @param {*} tree 数组或对象
 * @param {*} childrenKey 子节点的字段名，默认为 children
 * @param {*} parentKey 存储和父节点对应关系的字段名，不传则无此字段
 * @param {*} itemKey 元素的唯一标识，默认为 id
 * @param {*} deleteChildren 是否删除子集。默认为 true
 * @returns 一维数组
 */
function treeToArrConversion(
  tree,
  childrenKey,
  parentKey,
  itemKey,
  deleteChildren = true
) {
  if (tree == null) {
    return [];
  }
  if (
    Object.prototype.toString.call(tree) !== "[object Object]" &&
    Object.prototype.toString.call(tree) !== "[object Array]"
  ) {
    throw new Error("请传入数组或对象！");
  }
  childrenKey = childrenKey || "children";
  parentKey = parentKey || "";
  itemKey = itemKey || "id";
  const result = [];
  const stack = [];
  if (Array.isArray(tree)) {
    for (let i = tree.length - 1; i >= 0; i--) {
      stack.push(tree[i]);
    }
  } else {
    stack.push(tree);
  }
  while (stack.length) {
    const node = stack.pop();
    result.push(node);
    if (node[childrenKey]) {
      for (let i = node[childrenKey].length - 1; i >= 0; i--) {
        if (parentKey) {
          stack.push({
            ...node[childrenKey][i],
            [parentKey]: node[itemKey],
          });
        } else {
          stack.push(node[childrenKey][i]);
        }
      }
    }
    if (deleteChildren) {
      Reflect.deleteProperty(node, childrenKey);
    }
  }
  return result;
}

/**
 *
 * @param {*} tree 数据源
 * @param {*} cb 回调函数，参数为当前元素，返回 true 代表为该元素
 * @param {*} type 返回值类型，【alone】代表只返回该元素，【arr】代表返回该元素和所有的父级元素。默认为 alone
 * @param {*} childrenKey 子节点字段名，默认值为 children
 * @returns type 为 alone 返回该元素，为 arr 返回该元素和所有的父级元素
 */
function findItem(tree, cb, type, childrenKey) {
  if (tree == null) {
    return null;
  }
  if (
    Object.prototype.toString.call(tree) !== "[object Object]" &&
    Object.prototype.toString.call(tree) !== "[object Array]"
  ) {
    throw new Error("请传入数组或对象！");
  }
  childrenKey = childrenKey || "children";
  type = type || "alone";
  if (type === "alone") {
    const arr = treeToArrConversion(tree, childrenKey, null, null, false);
    return arr.find((i) => cb(i));
  } else if (type === "arr") {
    if (!Array.isArray(tree)) {
      tree = [tree];
    }
    const stack = [];
    stack.push({
      node: tree,
      path: [],
    });
    while (stack.length) {
      const { node, path } = stack.pop();
      for (let i = 0; i < node.length; i++) {
        const currentPath = [...path];
        const data = node[i];
        currentPath.push(data);
        if (cb(data)) {
          return currentPath;
        }
        if (data[childrenKey]) {
          stack.push({
            node: data[childrenKey],
            path: currentPath,
          });
        }
      }
    }
  }
}

/**
 *
 * @param {*} tree 数据源
 * @param {*} cb 回调函数，回调函数接收一个参数，为当前数组的元素，返回true则保留，false则过滤
 * @param {*} childrenKey 子节点的key，默认值为children
 * @returns 返回树形数组
 */
function treeFiltering(tree, cb, childrenKey) {
  if (tree == null) {
    return null;
  }
  if (
    Object.prototype.toString.call(tree) !== "[object Object]" &&
    Object.prototype.toString.call(tree) !== "[object Array]"
  ) {
    throw new Error("请传入数组或对象！");
  }
  if (!Array.isArray(tree)) {
    tree = [tree];
  }
  childrenKey = childrenKey || "children";

  const filterArr = [];
  tree.forEach((item) => {
    let childArr = [];
    if (item[childrenKey] && item[childrenKey].length) {
      childArr = treeFiltering(item[childrenKey], cb, childrenKey);
    }
    if (childArr.length || cb(item)) {
      filterArr.push({
        ...item,
        [childrenKey]: childArr.length ? childArr : null,
      });
    }
  });
  return filterArr;
}

export {
  arrayToTreeConversion,
  treeToArrConversion,
  findItem,
  treeFiltering,
};
