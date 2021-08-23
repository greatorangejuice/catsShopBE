import type {AWS} from '@serverless/typescript';

import {importFileParser, importProductsFile, catalogBatchProcess} from "@functions/index";

const serverlessConfiguration: AWS = {
    service: 'import-service-v3',
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
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            SQS_URL: {
                Ref: 'SQSQueue'
            },

        },
        lambdaHashingVersion: '20201221',
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 's3:ListBucket',
                Resource: 'arn:aws:s3:::rs-uploaded'
            },
            {
                Effect: 'Allow',
                Action: 's3:*',
                Resource: 'arn:aws:s3:::rs-uploaded'
            },
            {
                Effect: 'Allow',
                Action: 'sqs:*',
                Resource: {
                    "Fn::GetAtt": ['SQSQueue', 'Arn']
                }
            }
        ]
    },
    resources: {
        Resources: {
            ['SQSQueue']: {
                Type: 'AWS::SQS::Queue',
                Properties: {
                    ['QueueName']: 'import-service-sqs-parse',
                }
            }
        }
    },
    // import the function via paths
    // @ts-ignore
    functions: {importProductsFile, importFileParser, catalogBatchProcess},
};

module.exports = serverlessConfiguration;
