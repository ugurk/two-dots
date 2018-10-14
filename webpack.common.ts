import webpack from 'webpack';

const config: webpack.Configuration = {
    entry: "./src/TwoDots.ts",
    output: {
        filename: "two-dots.min.js"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
}

export default config;