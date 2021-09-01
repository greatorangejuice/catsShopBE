import type {AWS} from '@serverless/typescript';


import {getCatById, getProducts, createProduct} from "@functions/index";

const serverlessConfiguration: AWS = {
    service: 'cats-shop-service',
    frameworkVersion: '2',
    useDotenv: true,
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        stage: 'dev',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        lambdaHashingVersion: '20201221',
    },
    // import the function via paths
    functions: {getProducts, getCatById, createProduct},
};

module.exports = serverlessConfiguration;

// 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
