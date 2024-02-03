const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
var webpack = require('webpack');

module.exports = {
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('vue-svg')
  //     .test(/\.svg$/)
  //     .use('vue-svg-inline-loader')
  //     .loader('vue-svg-inline-loader')
  //     .end();
  // },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ]
  }
};


