var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    app: ["./lib/index.js"]
  },

  output: {
    filename: "material-ui-avatar-picker.min.js",
    path: "./dist",
    libraryTarget: "umd",
    library: "material-ui-avatar-picker"
  },

  externals: {
    react: "react",
    "react-dom": "react-dom",
    "@material-ui": "@material-ui"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader?optional=es7.objectRestSpread"},
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ]
};
