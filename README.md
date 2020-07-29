## react-typescript-less

此项目是项目搭建练习
没什么具体功能，就是搭建了一个架子

写过一篇从零搭建简单架子的教程[传送门](http://www.sicilymarmot.top/#/yang_detail_babel_1)

偷懒~教程里没有涉及react和antd

如果需要react，步骤大概如下

1. 在本项目package.json里把带react关键词的包都安装一下。
2. 然后在.babelrc文件中presets项中加入一项@babel/preset-react。
3. react要用jsx或者tsx嘛，参照webpack.config.js中，匹配.js或.ts的地方加上.jsx或者.tsx。
4. 入口文件后缀名改了的话，也要在webpack.config.js中改一下。
5. 重启项目，遇到报错不要慌，报错信息copy到搜索栏，求助广大网友~

antd参照官网装就行~

项目相关技术栈：
react & typescript & webpack & less & antd


```
安装依赖
yarn || npm install

启动开发环境
yarn dev || npm run dev
端口:1208

打包
yarn build || npm run build

打包后的文件包在build/dist
```
