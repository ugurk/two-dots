import * as merge from 'webpack-merge';
import {commonConfig} from './webpack.common';

const config = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map'
});

module.exports = config;
