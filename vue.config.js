// vue.config.js文件中的配置
const path = require('path');
module.exports = {
  // baseUrl: './', // 部署应用包时的基本 URL
  outputDir: 'dist', // build 时生成的生产环境构建文件的目录
  // assetsDir: '', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)
  filenameHashing: true, // 文件名哈希
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  runtimeCompiler: true,// 设置为 true 后你就可以在 Vue 组件中使用 template 选项
  productionSourceMap: false,// 是否需要生产环境的 source map
  css: {
    sourceMap: false, // 是否为 CSS 开启 source map
  },
  devServer: {// 环境配置
    host: 'localhost',
    port: 8082,
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
      '/api': {
        target: 'http://tiza-sd.com:55100',
        ws: true,
        changeOrigin: true
      },
    }
  },
  parallel: require('os').cpus().length > 1, // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
  pwa: {}, // PWA 插件相关配置 see => https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/common/global.less')
      ]
    }
  }, // 第三方插件配置
  configureWebpack: {
    module: {
      rules: [ // 可在package.json 配置顶层 sideEffects: false
        {
          test: /\.(js|jsx|vue)?$/,
          sideEffects: false // false | [] -> []放置不清除副作用文件
        },
        {
          test: /\.sass$/,
          loaders: ['style', 'css', 'sass']
        }
      ]
    },
    // externals: { // 在这里配置后，减少了压缩的包内容，需要在public/index.html通过cdn方式再引入,注意对应的版本
    //   vue: "Vue",
    //   vuex: "Vuex",
    //   "vue-router": "VueRouter",
    //   "element-ui": "ELEMENT"
    // }
  }
}