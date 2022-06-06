const glob = require("glob")
const path = require('path')
const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const GitRevision = new GitRevisionPlugin()
const buildDate = JSON.stringify(new Date().toLocaleString())
const createThemeColorReplacerPlugin = require('./config/plugin.config')
// const CompressionPlugin = require("compression-webpack-plugin")
function resolve(dir) {
  return path.join(__dirname, dir)
}

// check Git
function getGitHash() {
  try {
    return GitRevision.version()
  } catch (e) { }
  return 'unknown'
}
const isProd = process.env.NODE_ENV === 'production'

var projectname = process.argv[3];
function getEntry() {
  var entries = {};
  if (isProd && projectname) {
    console.log(1);
    entries = {
      index: {
        //入口
        entry: 'src/pages/' + projectname + '/main.js',
        //模板来源
        template: 'public/template.html',
        filename: 'template.html',
        title: projectname,
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
    }
  } else {
    console.log(2);
    // 开发环境  
    var item = glob.sync('./src/pages/*/*.js')//引入glob模块读pages下所有一级目录中一级js文件
    item.forEach((filePath) => {
      var fileList = filePath.split("/");
      var filename = fileList[fileList.length - 2];
      // console.log(filename);  这里取到路径之后切割拿到文件夹名，已文件夹名命名打包文件夹
      //组件page需要的内容
      console.log(filename);
      entries[filename] = {
        // 打包所需要的内容
        entry: `src/pages/${filename}/main.js`,
        template: `public/template.html`,
        filename: `${filename}.html`,
        chunks: ['chunk-vendors', 'chunk-common', filename]
      }
    })
  }
  console.log(entries);

  return entries
}
const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    // 'vue.min.js',
    // 'vue-router.min.js',
    // 'vuex.min.js',
    // 'axios.min.js',
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}
var pages = getEntry()


// vue.config.js
const vueConfig = {
  publicPath: isProd ? './' : '/',
  outputDir: projectname ? "dist/" + projectname : "dist/",
  pages: pages,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      //new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        GIT_HASH: JSON.stringify(getGitHash()),
        BUILD_DATE: buildDate
      }),
      //关闭IgnorePlugin后只打包中文包，不影响打包后的大小
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@One', resolve('src/pages/One'))
      .set('@Two', resolve('src/pages/Two'))
      .set('@', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd && projectname) {
      // build指定应用
      config.plugin('html-index').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
      // //生产环境，开启js\css压缩
      // config.plugin('compressionPlugin').use(new CompressionPlugin({
      //   test: /\.js$|.\css|.\less/, // 匹配文件名
      //   threshold: 10240, // 对超过10k的数据压缩
      //   deleteOriginalAssets: true // 删除源文件
      // }))
    }
    else if (isProd && !projectname) {
      // build全部应用
      var items = glob.sync("./src/pages/*/*.js");
      for (var i in items) {
        var filepath = items[i];
        var fileList = filepath.split("/");
        var fileName = fileList[fileList.length - 2];
        config.plugin('html-' + `${fileName}`).tap(args => {
          args[0].cdn = assetsCDN
          return args
        })
      }
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          'primary-color': '#1890FF',

          'link-color': '#1890FF',

          'border-radius-base': '2px',

          'menu-dark-submenu-bg': '#102551'
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 9011,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/ass': {
        target: 'http://complex.shichengtech.com',
        // target: 'http://laboratory.shichengtech.com/api',

        ws: false,
        changeOrigin: true,
        pathRewrite: { '^/ass': '' }
      }
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
