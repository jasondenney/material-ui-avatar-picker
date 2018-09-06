var path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './example/src/index.js']
  },

  output: {
    path: './example',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?optional=es7.objectRestSpread"},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },

  devServer: {
    contentBase: './example',
    host: 'localhost',
    port: 9021,
    info: false
  }
};
