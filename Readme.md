# 项目搭建介绍

## 一、 项目初始化

 1. webpack相关 `npm i -D webpack webpack-cli webpack-merge  webpack-dev-server  clean-webpack-plugin html-webpack-plugin`

 2. react相关 `npm i react react-dom @types/react @types/react-dom`

 3. typescript相关 `npm i -D typescript` 配置 tsconfig
 
 4. Babel相关 `npm i babel-loader @babel/core @babel/preset-react @babel/preset-env  -D`
        - babel-loader: 使用 babel 加载最新js代码并将其转换为低版本语法
        - @babel/corer: babel编译的核心包
        - @babel/preset-env: babel 编译的预设,可以转换目前最新的js语法
        - @babel/preset-react: 可以解析jsx文件解析为js文件的预设
        <!-- - @babel/plugin-transform-runtime 解决@babel/polyfill转换后全局污染的问题， -->
        - babel-plugin-import 按需引入 为组件库实现单组件按需加载并且自动引入其样式 看需求有些ui库不需要引入去支持

 5. 安装 antd `npm i -S antd`




## 参考文档

- [配置文档介绍] (https://www.tslang.cn/docs/handbook/compiler-options.html)
