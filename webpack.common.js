const glob = require('glob');
const path = require('path');

module.exports = {
  // entry: glob.sync('./src/**/*.ts'),
  entry: './index.ts',
  output: {
    filename: 'two-dots.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TwoDots',
		libraryTarget: "umd"
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
        include: __dirname + '/src'
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  }
};
