const path = require('path');

module.exports = {
  entry: "./wp/entry.jsx",
  output: {
      path: path.resolve(__dirname, 'public/assets/javascripts/'),
      filename: "submission.js"
  },
  devServer: {
      headers: {
          'Access-Control-Allow-Origin': '*'
      }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2017']
        }
      }
    ]
  }
};
