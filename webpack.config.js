var path = require('path');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './example/src/index.js']
  },

  output: {
    path: __dirname+'/example',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      { test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }        
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },

  devServer: {
    contentBase: './example',
    host: 'localhost',
    port: 9021
  }
};
