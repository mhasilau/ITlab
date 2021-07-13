const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
      filename: 'bundle[chunckhash].js',
      path: path.resolve(__dirname, 'dist')
  },
  plugins: [
      new HTMLWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'sign-in.html',
          template: './src/assets/sign-in/sign-in.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'sign-up.html',
          template: './src/assets/sign-up/sign-up.html'
      })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg,gif|jpeg)$/,
        use: 'file-loader'
      }
    ]
  },
  devServer: {
    port: 5000
  }
}