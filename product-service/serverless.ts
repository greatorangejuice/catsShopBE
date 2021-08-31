import type {AWS} from '@serverless/typescript';


import {getCatById, getProducts, createProduct} from "@functions/index";

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
            PG_HOST: 'postgres-db-0.cccgaep08fok.eu-west-1.rds.amazonaws.com',
            PG_PORT: '5432',
            PG_DATABASE: 'catsDB',
            PG_USERNAME: 'postgres',
            PG_PASSWORD: 'jimbowimbo9W',
        },
        lambdaHashingVersion: '20201221',
    },
    // import the function via paths
    functions: {getProducts, getCatById, createProduct},
};

module.exports = serverlessConfiguration;

// 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
