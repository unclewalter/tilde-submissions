const path = require('path');

module.exports = {
  entry: "./wp/entry.jsx",
  output: {
      path: path.resolve(__dirname, 'public/assets/javascripts/'),
      filename: "bundle.js"
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
