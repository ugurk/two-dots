import * as glob from 'glob';
import * as webpack from 'webpack';

export let commonConfig: webpack.Configuration = {
    entry: glob.sync('./src/**/*.ts'),
    output: {
        filename: 'two-dots.min.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
