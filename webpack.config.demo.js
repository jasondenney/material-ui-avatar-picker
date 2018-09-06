var path = require('path');

module.exports = {
  entry: {
    app: ['./example/src/index.js']
  },

  output: {
    filename: './example/bundle.js',
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?optional=es7.objectRestSpread"},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
};
