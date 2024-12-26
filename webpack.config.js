import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // 模拟 CommonJS 的 __dirname

export default {
  // 入口文件
  entry: {
    index: "./src/index.js",
    tree: './src/tree.js',
    operation: './src/operation.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // 使用[name]来确保每个文件名不同
    library: {
      name: "li-zt-utils", // 替换为你的库名称
      type: "umd", // 支持多种模块化规范
    },
  },
  // 模块规则，例如使用 Babel 转换 ES6 代码
  module: {
    rules: [
      {
        test: /\.js$/, // 适用于所有 .js 文件
        exclude: /node_modules/, // 排除 node_modules
        use: {
          loader: "babel-loader", // 使用 Babel loader
          options: {
            presets: ["@babel/preset-env"], // Babel 配置
          },
        },
      },
    ],
  },
  mode: "production", // 使用生产模式，优化代码
  optimization: {
    minimize: false, // 禁用代码压缩
  },
};
