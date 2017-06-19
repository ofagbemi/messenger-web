const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');


const ROOT_DIRECTORY = './js/';
const commonCSSLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      plugins: [autoprefixer({ browsers: ['last 2 versions'] })],
    },
  },
  'sass-loader?outputStyle=expanded',
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(ROOT_DIRECTORY, 'style/variables.scss'),
      ],
    },
  },
];

module.exports = {
  entry: {
    app: path.resolve(ROOT_DIRECTORY, 'index.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'react-redux',
      'immutable',
    ],
  },
  output: {
    path: path.resolve('../public/generated/'),
    filename: 'app.[chunkhash].js',
  },
  plugins: [
    new BundleTracker({ filename: 'webpack-stats.json', indent: 2 }),
    new ExtractTextPlugin({
      filename: 'app.[chunkhash].css',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app', 'vendor'],
    }),
  ],
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve(ROOT_DIRECTORY),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\//,
      },
      {
        test: /\.s?css$/,
        exclude: /style\//g,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
            ...commonCSSLoaders,
          ],
        }),
      },
      {
        test: /\.s?css$/,
        include: /style\//g,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {},
            },
            ...commonCSSLoaders,
          ],
        }),
      },
    ],
  },
};
