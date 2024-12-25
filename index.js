/**
 * 显示层级数据
 * @param tree {Array} 树数据
 * @param func {Function} 回调函数
 * @param field {String} 字段名称
 * @param path {Array} 路径数据
 * @returns {*[]|[]|*}
 */
export function treeFindPath(tree, func, field = '', path = []) {
    if (!tree) {
      return [];
    }
    for (const data of tree) {
      field === '' ? path.push(data) : path.push(data[field]);
      if (func(data)) {
        return path;
      }
      if (data.children) {
        const findChildren = treeFindPath(data.children, func, field, path);
        if (findChildren.length) {
          return findChildren;
        }
      }
      path.pop();
    }
    return [];
  }
  
  /**
   *
   * @param {*} arr 需过滤的数组
   * @param {*} callback 过滤条件回调函数，回调函数接收一个参数，为当前数组的元素，返回true则保留，false则过滤
   * @param {*} childrenKey 子节点的key，默认值为children
   */
  export function filter(arr, callback, childrenKey = 'children') {
    const filterArr = [];
    arr.forEach((item) => {
      let childArr = [];
      if (item[childrenKey] && item[childrenKey].length) {
        childArr = filter(item[childrenKey], callback, childrenKey);
      }
      if (childArr.length || callback(item)) {
        filterArr.push({
          ...item,
          [childrenKey]: childArr.length ? childArr : null,
        });
      }
    });
    return filterArr;
  }
  
  export function treeToArray(tree, childrenKey = 'children', result = []) {
    tree.forEach((node) => {
      if (node[childrenKey] && node[childrenKey].length > 0) {
        treeToArray(node[childrenKey], childrenKey, result);
      }
      node[childrenKey] = null;
      result.push(node);
    });
    return result;
  }
  
  export function treeFindItem(tree, func, field = 'children') {
    if (!tree || tree.length === 0) {
      return null;
    }
  
    let item = null;
  
    for (let i = 0; i < tree.length; i++) {
      const currentItem = tree[i];
      // 如果 func 函数满足条件，则返回该项
      if (func(currentItem)) {
        item = currentItem;
        break;
      }
      // 如果当前项有子节点，递归查找子节点
      if (currentItem[field] && Array.isArray(currentItem[field])) {
        item = treeFindItem(currentItem[field], func, field);
        if (item) {
          break;
        }
      }
    }
    return item;
  }
  
  