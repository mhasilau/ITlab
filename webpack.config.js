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
          template: './src/index.html',
          favicon: './src/assets/pictures/favico.png'
      }),
      new HTMLWebpackPlugin({
          filename: 'sign-in.html',
          template: './src/components/sign-in/sign-in.html',
          favicon: './src/assets/pictures/favico.png'
      }),
      new HTMLWebpackPlugin({
          filename: 'sign-up.html',
          template: './src/components/sign-up/sign-up.html',
          favicon: './src/assets/pictures/favico.png'
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
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset'
      }
    ]
  },
  devServer: {
    port: 5000
  }
}