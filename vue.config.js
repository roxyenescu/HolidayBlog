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


// module.exports = {
//   chainWebpack: (config) => {
//     const svgRule = config.module.rule("svg");

//     // svgRule.uses.clear();

//     svgRule
//       .use("babel-loader")
//       .loader("babel-loader")
//       .end();

//     svgRule
//       .use("vue-svg-loader")
//       .loader("vue-svg-loader");
//   },
// };

