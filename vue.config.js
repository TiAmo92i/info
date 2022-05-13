const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/list-server': {
        // target: 'http://127.0.0.1:8000',
        target: 'http://152.136.123.63:8000',
      },
    },
  },
})
