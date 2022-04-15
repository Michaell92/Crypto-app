const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',

  entry: {
    'js/index': path.resolve(__dirname, './src/app.js'),
    'js/chart': path.resolve(__dirname, './src/chart.js'),
    'js/finance': path.resolve(__dirname, './src/finance.js'),
    'js/global': path.resolve(__dirname, './src/global.js'),
    'js/markets': path.resolve(__dirname, './src/markets.js'),
    'js/network': path.resolve(__dirname, './src/network.js'),
    'js/form': path.resolve(__dirname, './src/form.js'),
    'css/chart': path.resolve(__dirname, './scss/chart.scss'),
    'css/finance': path.resolve(__dirname, './scss/finance.scss'),
    'css/global': path.resolve(__dirname, './scss/global.scss'),
    'css/network': path.resolve(__dirname, './scss/network.scss'),
    'css/style': path.resolve(__dirname, './scss/style.scss'),
    'css/table': path.resolve(__dirname, './scss/table.scss'),
    'css/form': path.resolve(__dirname, './scss/form.scss'),
  },

  module: {
    rules: [
      {
        test: /\js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    static: path.resolve(__dirname, 'dist'),
  },
};
