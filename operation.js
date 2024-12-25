/**
 * 加法函数，用来得到精确的加法结果
 * @param {*} arg1
 * @param {*} arg2
 * @returns arg1 加 arg2 的精确结果
 */
function accAdd(arg1, arg2) {
  let r1, r2;
  let m = "";
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

/**
 * 减法函数，用来得到精确的减法结果
 * @param {*} arg2
 * @param {*} arg1
 * @returns arg1 减 arg2 的精确结果
 */
function accSub(arg2, arg1) {
  let r1, r2;
  let m = "";
  let n = "";
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  // 动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg2 * m - arg1 * m) / m).toFixed(n) - 0;
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * @param {*} arg1
 * @param {*} arg2
 * @returns arg1 乘 arg2 的精确结果
 */
function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

/**
 * 除法函数，用来得到精确的乘法结果
 * @param {*} arg1
 * @param {*} arg2
 * @returns arg1 除 arg2 的精确结果
 */
function accDiv(arg1, arg2) {
  let t1 = 0;
  let t2 = 0;
  let r1 = "";
  let r2 = "";
  try {
    t1 = arg1.toString().split(".")[1].length;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
    // eslint-disable-next-line no-empty
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return accMul(r1 / r2, Math.pow(10, t2 - t1));
}

export { accAdd, accSub, accMul, accDiv };
