const HtmlWebPackPlugin = require("html-webpack-plugin");

const path = require('path');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            },
          },
          {
            loader: 'sass-loader',
          },
        ]
      }
    ],
    // devServer: {
    //   hot: true,
    //   contentBase: path.join(__dirname, 'dist'),
    //   compress: true,
    //   port: 3001,
    //   overlay: true,
    // },
  },
  plugins: [htmlWebpackPlugin]
};