/* eslint-disable no-console */
const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
  console.log('env', env);
  const isProduction = env === 'production';

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          // Will use babel on js files
          loader: 'babel-loader',

          // Only .js files that are not in node_modules folder
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: 'styles.css',
        chunkFilename: '[id].css'
      })
    ],
    // Used when debugging: so when there's an error
    // you see the line in the original source file and not bundle.js!
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  };
};
