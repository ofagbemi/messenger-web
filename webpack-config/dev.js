const baseConfig = require('./base');

const config = Object.assign({}, baseConfig);

config.output.filename = '[name].[hash].js';
config.output.publicPath = 'http://localhost:3000/public/generated/';
config.devServer = {
  hot: true,
  port: 3000,
  clientLogLevel: 'warning',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

module.exports = config;
