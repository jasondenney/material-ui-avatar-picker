var path = require('path');

module.exports = {
  entry: {
    app: ['./example/src/index.js']
  },

  output: {
    filename: './example/bundle.js',
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
};
