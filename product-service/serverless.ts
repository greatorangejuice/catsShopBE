import type {AWS} from '@serverless/typescript';

import {getCatById, getProducts, hello} from "@functions/index";

const serverlessConfiguration: AWS = {
    service: 'cats-shop-service',
    frameworkVersion: '2',
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
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        lambdaHashingVersion: '20201221',
    },
    // import the function via paths
    functions: {hello, getProducts, getCatById},
};

module.exports = serverlessConfiguration;

// 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
