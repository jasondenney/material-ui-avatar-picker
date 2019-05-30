var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    app: ["./lib/index.js"]
  },

  output: {
    filename: "material-ui-avatar-picker.min.js",
    path: __dirname+"/dist",
    libraryTarget: "umd",
    library: "material-ui-avatar-picker"
  },

  externals: {
    react: "react",
    "react-dom": "react-dom",
    "@material-ui": "@material-ui"
  },

  module: {
    rules: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }        
        }
      },
      // { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },

  optimization: {
    minimize: false
  }
};
