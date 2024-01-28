const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue-svg')
      .test(/\.svg$/)
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader')
      .end();
  },
};


