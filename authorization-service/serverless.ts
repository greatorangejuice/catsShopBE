import type {AWS} from '@serverless/typescript';

import {basicAuthorizer} from '@functions/index';

const serverlessConfiguration: AWS = {
    service: 'authorization-service',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
    provider: {
        name: 'aws',
        region: 'eu-west-1',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        lambdaHashingVersion: '20201221',
    },
    resources: {
        Outputs: {
            AuthorizationARN: {
                Description: "Authorization ARN of the token authorization",
                Value: {
                    "Fn::GetAtt": ["BasicAuthorizerLambdaFunction", "Arn"]
                },
                Export: {
                    Name: 'AuthorizationARN'
                }
            }
        }
    },


    // import the function via paths
    functions: {basicAuthorizer},
};

module.exports = serverlessConfiguration;
