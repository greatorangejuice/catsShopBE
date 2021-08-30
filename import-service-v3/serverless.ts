import type {AWS} from '@serverless/typescript';

import {catalogBatchProcess, importFileParser, importProductsFile} from "@functions/index";

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
            SNS_ARN: {
                Ref: 'SNSTopic'
            },
            PG_HOST: 'postgres-db-0.cccgaep08fok.eu-west-1.rds.amazonaws.com',
            PG_PORT: '5432',
            PG_DATABASE: 'catsDB',
            PG_USERNAME: 'postgres',
            PG_PASSWORD: 'jimbowimbo9W',
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
            },
            {
                Effect: 'Allow',
                Action: 'sns:*',
                Resource: {
                    'Ref': 'SNSTopic'
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
            },
            ['SNSTopic']: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    ['TopicName']: 'createProductTopic',
                }
            },
            ['SNSSubscription']: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'bypavelsnigirev@gmail.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic'
                    }
                }
            }
        }
    },
    // import the function via paths
    // @ts-ignore
    functions: {importProductsFile, importFileParser, catalogBatchProcess},
};

module.exports = serverlessConfiguration;
