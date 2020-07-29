
const { resolve } = require('./utils');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const browsers_list = ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'];
const SRC_DIR = resolve('src');

// 负责将html文档虚拟到根目录下
let htmlWebpackPlugin = new HtmlWebpackPlugin({
    // 虚拟的html文件名 index.html
    filename: 'index.html',
    // 虚拟html的模板为 src下的index.html
    template: path.resolve(__dirname, '../src/index.html')
})

module.exports = {
    // 开发模式
    // mode: 'development',
    // 配置入口文件
    entry: './main.tsx',
    // 出口文件目录为根目录下dist, 输出的文件名为main
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dist.js',
        publicPath: '/'
    },
    // 配置开发服务器, 并配置自动刷新
    devServer: {
      // 根目录下dist为基本目录
      contentBase: path.join(__dirname, 'dist'),
      // 自动压缩代码
      compress: true,
      // 服务端口为1208
      port: 1208,
      // 自动打开浏览器
      open: false,
      historyApiFallback: true
    },
    resolve: {
      extensions: ['.js', '.tsx', '.ts', '.json'],
      alias: {
        '@': SRC_DIR,
      },
    },
    // 配置loader
    module: {
        // alias:{
        //   '@': path.resolve('src'),
        // },
        // 根据文件后缀匹配规则
        rules: [
          {
            test: /\.(jpg|png)$/,
            use: 'url-loader'
          },
          {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
            ]
          },
          {
            test: /\.less$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                {loader: "less-loader",
                options: { // antd定制主题
                  modifyVars: {
                    '@primary-color': '#26bf80',//主题色
                    '@warning-color': '#fa541c', //警告色
                    '@success-color': '#26bf80', //成功色
                    '@error-color': '#fa541c', //错误色
                  },
                  javascriptEnabled: true,
                },
              }, // compiles Sass to CSS
            ]
          },
          {
            test: /\.(ts|tsx)$/,
            use: [
              {
                loader: "babel-loader",
              },
              {
                loader: "ts-loader",
                options: {
                  transpileOnly: true,  // 只进行编译
                  getCustomTransformers: () => ({
                    before: [tsImportPluginFactory({
                      libraryDirectory: 'es',
                      libraryName: 'antd',
                      style: true,
                    })]
                  }),
                }
              }
            ],
            exclude: /node_modules/
          },
        ]
    },
    // 装载虚拟目录插件
    plugins: [htmlWebpackPlugin],
}