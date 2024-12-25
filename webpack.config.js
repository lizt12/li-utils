import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 模拟 CommonJS 的 __dirname

export default {
  entry: "./src/index.js", // 入口文件
  output: {
    path: path.resolve(__dirname, "dist"), // 输出目录
    filename: "index.js", // 输出文件名
    library: {
      name: "li-zt-utils", // 替换为你的库名称
      type: "umd", // 支持多种模块化规范
    },
  },
  mode: "production", // 使用生产模式，优化代码
  optimization: {
    minimize: false, // 禁用代码压缩
  },
};
