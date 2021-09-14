import type {AWS} from '@serverless/typescript';

import {createProduct, getProductById, getProducts} from './src/functions';

const serverlessConfiguration: AWS = {
    service: 'product-service-v3',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true
        }
    },
    plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
    provider: {
        name: 'aws',
        region: 'eu-west-1',
        runtime: 'nodejs12.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            PG_HOST: `${process.env.PG_HOST}`,
            PG_PORT: `${process.env.PG_PORT}`,
            PG_DATABASE: `${process.env.PG_DATABASE}`,
            PG_USERNAME: `${process.env.PG_USEERNAME}`,
            PG_PASSWORD: `${process.env.PG_PASSWORD}`,
        },
        lambdaHashingVersion: '20201221',
    },
    functions: {getProducts, getProductById, createProduct}
}

module.exports = serverlessConfiguration;
