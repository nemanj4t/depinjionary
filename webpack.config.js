const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'depinjionary.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'Depinjionary',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
};