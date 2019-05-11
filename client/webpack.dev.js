const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 4000,
    overlay: true,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(html)$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ]
}