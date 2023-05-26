// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
  cache: {
    // 1. 将缓存类型设置为文件系统
    type: 'filesystem', // 默认是memory
    // 2. 将缓存文件夹命名为 .temp_cache,
    // 默认路径是 node_modules/.cache/webpack
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),

  },
  entry: {
    //入口文件
    app: "./src/index.tsx",
  },
  output: {
    //出口文件
    publicPath: "/",
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
  },
  plugins: [ // css提取
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './public/index.html'
  }),
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: devMode ? 'css/[name].css' : 'css/[name].[chunkhash].css',
      // chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[chunkhash].css',
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    alias: {
      '@': path.join(__dirname, './src'),
    },
    extensions: ['.tsx', '.ts', '.js']
    // extensions: ['.js','.jsx', '.json'], //自动解析确定的扩展。默认值为
  },
  module: {

    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../',
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              // hmr: devMode, // 仅dev环境启用HMR功能
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              // publicPath: '../',
              publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              // hmr: devMode, // 仅dev环境启用HMR功能
            },
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ]
  },
  devServer: {
    // 提供静态文件目录地址
    // 基于express.static实现
    // contentBase: path.join(__dirname, "dist"),
    // 将此项配置设置为 true 时，将会跳过 host 检查。这是不推荐的因为不检查 host 的应用容易受到 DNS 重新绑定攻击
    // disableHostCheck:true,
    // 在所有响应中添加首部内容
    headers: {
      "X-Custom-Foo": "bar"
    },
    // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”
    // lazy:true,
    // 任意的 404 响应都被替代为 index.html
    // 基于node connect-history-api-fallback包实现
    historyApiFallback: true,
    // 是否一切服务都启用 gzip 压缩
    // 基于node compression包实现
    compress: true,
    // 是否隐藏bundle信息
    // noInfo: true,
    // 发生错误是否覆盖在页面上
    // overlay: true,
    // 是否开启热加载
    // 必须搭配webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
    // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加
    hot: true,
    // 热加载模式
    // true代表inline模式，false代表iframe模式
    // inline: true, // 默认是true
    // 是否自动打开
    open: true,
    // 设置本地url和端口号
    host: 'localhost',
    port: 8081,
    // 代理
    // 基于node http-proxy-middleware包实现
    proxy: {
        // // 匹配api前缀时，则代理到3001端口
        // // 即http://localhost:8080/api/123 = http://localhost:3001/api/123
        // // 注意:这里是把当前server8080代理到3001，而不是任意端口的api代理到3001
        // '/api': 'http://localhost:3001',
        // // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
        // // 主要解决跨域问题
        // changeOrigin: true,
        // // 针对代理https
        // secure: false,
        // // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
        // pathRewrite: {'^/api' : ''},
        // // 输出本次代理请求的日志信息
        // bypass: function (req, res, proxyOptions) {
        //     console.log(proxyOptions.target)
        // }
    }
},
}
