const {merge} = require('webpack-merge')
const baseConfig = require('./webpack.common.js')


module.exports = merge(baseConfig,{
    mode: 'development', // 指定当前为开发模式
    devtool: 'inline-source-map', // 隐射对应的源码
    devServer: { // 启动webpack-dev-server本地服务
        open: true, // 开启自动打开浏览器
        hot: true, // 开启热更新
        historyApiFallback: true,
        proxy: {
            '/api': {
              target: 'http://www.a-fake-url.com',
              changeOrigin: true,
            },
        },
    }
})