const {merge} = require('webpack-merge')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 分析打包速度
const baseConfig = require('./webpack.common')

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(baseConfig,{
    mode: 'production',
    // devtool: 'source-map', // 是否生成单独的source map源码映射文件
    output: {
        publicPath: '/'
    }
}))