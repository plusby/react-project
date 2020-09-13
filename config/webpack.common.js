const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWbpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin'); // 压缩js

// 开发环境
const devMode = process.env.NODE_ENV !== 'production'

// 入口文件
const entryUrl = process.env.MODULE === 'Home' ? `../src/pages/${process.env.MODULE}/index.js` : `../src/pages/modules/${process.env.MODULE}/index.js`

module.exports = {
    entry: { // 入口文件
        app: path.resolve(__dirname,entryUrl)
    },
    output: { // 输入文件
        filename: devMode ? '[name].js' : '[name].[hash:6].js',
        path: path.resolve(__dirname,`../dist/${process.env.MODULE}/`),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // import自动添加这些后缀
        alias: { // 配置别名
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/, // 处理图片字体
                exclude: /[\\/]node_modules[\\/]/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: 'assets/[name].[sha512:hash:base64:7].[ext]',
                    },
                  }
                ],
            },
            {
                test: /(\.s[ac]ss)|(\.less)|(\.css)$/i, // 处理css
                // exclude: /[\\/]node_modules[\\/]/,
                include: [/antd/,/src/],
                use: [
                //   {  // less-loader降到3以下的版本就无法使用MiniCssExtractPlugin
                //     loader: MiniCssExtractPlugin.loader,
                //     options: {
                //       esModule: true, // 支持ES模块语法
                //       hmr: devMode, // CSS文件的模块热重载
                //     },
                //   },
                  'style-loader',
                  'css-loader',
                  'postcss-loader',
                //   'sass-loader',
                  { 
                    loader: 'less-loader',
                    options: {
                        lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                            modifyVars: {
                                // 'primary-color': '#1DA57A',
                                // 'link-color': '#1DA57A',
                                // 'border-radius-base': '2px',
                            },
                        },
                    },
                  },
                ],
            },
            {
                test: /(\.js(x?))|(\.ts(x?))$/, // 解析js使用babel-loader，并且缓存
                exclude: /[\\/]node_modules[\\/]/,
                loader: 'babel-loader?cacheDirectory=true',
                query: {
                    plugins: [
                        ["import", {libraryName: "antd", style: true}] //按需加载
                    ]
                },
            },
            {
                test: /\.html$/,
                exclude: /[\\/]node_modules[\\/]/,
                loader: 'html-loader',
                options: {
                    minimize: !devMode, // 生产就进行压缩
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), // 清楚上次打包的结果
        new HtmlWbpackPlugin({ // 拷贝html到指定的目录并且引入打包之后的js文件
            template: path.resolve(__dirname, '../src/index.html'), // 要拷贝的文件
            filename: 'index.html', // 拷贝之后的文件名
        }),
        new webpack.ProvidePlugin({ // 像每个文件中注入react，使用的时候无需手动引入
            React: 'react',
            ReduxConnect: ['react-redux', 'connect'],
        }),
        new MiniCssExtractPlugin({ // 提取Css为单独的文件
            filename: devMode ? '[name].css' : '[name].[hash].css',
        }),
        new CompressionPlugin({ // 使用gzip压缩js和css文件，允许缓存文件
            cache: true,
            algorithm: 'gzip',
            test: /\.(js|css)$/,
        }),
    ],
    optimization: {
        runtimeChunk: 'single', //表示生成一个单独的运行时文件，这个文件会被所有的块（chunks）共享。
        splitChunks: {// 分包
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    },
                    chunks: 'all'
                }
            }
        }
    }

}