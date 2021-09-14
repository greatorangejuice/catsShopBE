import type { AWS } from '@serverless/typescript';

import { hello, getProducts, getProductById, createProduct } from './src/functions';

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
    lambdaHashingVersion: '20201221',
  },
  functions: { hello, getProducts, getProductById, createProduct }
}

module.exports = serverlessConfiguration;
