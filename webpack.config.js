const path = require('path')
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve('dist/js'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader'
      }
    ]
  }
}

