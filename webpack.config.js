const path = require('path');
const { srcPath, distPath } = require('./config/path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  mode: 'development',
  devtool: false,
  // devtool: 'inline-cheap-source-map',
  entry: path.resolve(srcPath, 'index'),
  output: {
    filename: 'mini-vue.js',
    path: distPath,
    clean: true,
    // library: 'MiniVue',
    // libraryTarget: 'umd'
  },
  plugins: [
    // new ClearWebpackPlugin(),
    // 单入口
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      title: 'Web App'
    })
  ],
  devServer: {
    port: 3000, // 默认开启本地服务的端口号
    open: true, // 自动打开浏览器
    static: distPath, // 根目录
    compress: true, // 启动 gzip 压缩

  },

  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: ['babel-loader'],
    //     include: srcPath,
    //     exclude: /node_modules/
    //   }
    // ]
    rules: [
      // ES6+ 语法处理
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }

};
