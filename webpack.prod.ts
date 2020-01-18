import * as merge from 'webpack-merge';
import {commonConfig} from "./webpack.common";

const config = merge(commonConfig, {
    mode: 'production'
});

module.exports = config;
