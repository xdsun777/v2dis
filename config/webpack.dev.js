const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: '9080',
    compress: true,
    hot: true,
    open: true,
    static: false,
    // client: {
    //   overlay: {
    //     errors: true,
    //     warnings: false,
    //   },
    //   progress: true
    // },
  },
});
