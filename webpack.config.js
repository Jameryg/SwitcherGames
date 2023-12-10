const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.production ? 'production' : 'development',

    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-typescript'
              ]
            }
          }
        }
      ]
    },

    resolve: {
      extensions: ['.js', '.ts']
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new CopyPlugin({
        patterns: [{
          from: 'assets/'
        }]
      })
    ]
  }
};