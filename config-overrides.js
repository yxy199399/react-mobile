const {
  override,
  addPostcssPlugins,
  fixBabelImports,
  overrideDevServer,
  addWebpackAlias,
  // useEslintRc
} = require('customize-cra')
const path = require('path')
// 配置代理
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BASE_API,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  }
}
module.exports = {
  webpack: override(
    addPostcssPlugins([
      require('postcss-normalize')({
        forceImport: true,
      }),
      require('postcss-preset-env')({
        stage: 0,
      }),
    ]),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
    // useEslintRc(path.resolve(__dirname, './.eslintrc')),

    // 配置别名
    addWebpackAlias({
      '@': path.resolve(__dirname, './src/'),
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
}
