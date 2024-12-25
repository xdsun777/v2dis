const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const rootPath = __dirname


module.exports = {
    context: rootPath,
    entry: {
        app: './src/main.js'
    },
    output: {
        filename: '[name].[fullhash:5].bundle.js',
        path: path.resolve(rootPath, 'dist'),
        clean: true
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'wcbat',
            favicon: './public/favicon.ico',
            template: './public/index.html',
            filename: 'index.html',
            meta: {
                viewport: 'width=device-width,initial-scale=1',
                description: 'wcbat',
            }
        }),
        new VueLoaderPlugin(),
        new webpack.BannerPlugin('由xdsun777编写'), // 给输出的文件添加头信息
        new ESLintPlugin({ fix: false }),
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            analyzerHost: "127.0.0.1",
            analyzerPort: 9999, // 运行后的端口号
            generateStatsFile: true
            // reportFilename: "report.html",
            // defaultSizes: "parsed",
            // openAnalyzer: true,
            // generateStatsFile: false,
            // statsFilename: "stats.json",
            // statsOptions: null,
            // logLevel: "info"
        }),  // 打包体积分析
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'all',
            hidePathInfo: true,
            // minSize: 30000,
            // maxSize: 50000,
            // minSizeReduction: 250,
            // maxAsyncRequests: 30,
            // maxInitialRequests: 30,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/i,
                use: ['vue-loader']
            },
            {
                test: /\.js$/i,
                loader: 'babel-loader',
                include: path.resolve(rootPath, "src")
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/i,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 1024 * 8,
                    name: 'assets/img/[name].[hash].[ext]'
                }
                // type: 'asset/resource',
            },
            {
                test: /\.(map|woff|woff2|eot|ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: 'assets/fonts/[name].[hash].[ext]'
                }
                // type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            }
        ]
    },
    resolve: {
        // 设置别名
        alias: {
            '@': path.resolve(rootPath, 'src'),
            '@components': path.resolve(rootPath, 'src/components')
        }
    }
}