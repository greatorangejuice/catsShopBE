import type {AWS} from '@serverless/typescript';

import {importFileParser, importProductsFile} from "@functions/index";

const serverlessConfiguration: AWS = {
    service: 'import-service-v3',
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
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            SQS_URL: {
                Ref: 'SQSQueue'
            },
            // SNS_ARN: {
            //     Ref: 'SNSTopic'
            // },
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
            // {
            //     Effect: 'Allow',
            //     Action: 'sns:*',
            //     Resource: {
            //         'Ref': 'SNSTopic'
            //     }
            // }
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
            GatewayResponseAccessDenied: {
                Type: 'AWS::ApiGateway::GatewayResponse',
                Properties: {
                    ResponseParameters: {
                        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
                    },
                    ResponseType: 'ACCESS_DENIED',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi',
                    },
                },
            },
            GatewayResponseUnauthorized: {
                Type: 'AWS::ApiGateway::GatewayResponse',
                Properties: {
                    ResponseParameters: {
                        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
                        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
                    },
                    ResponseType: 'DEFAULT_4XX',
                    RestApiId: {
                        Ref: 'ApiGatewayRestApi',
                    },
                },
            },
        },
        Outputs: {
            // SNSTopicARN: {
            //     Description: 'SNSTopic ARN',
            //     Value: {
            //         // "Fn::GetAtt": ["SNSTopic", "Arn"]
            //         Ref: 'SNSTopic'
            //     },
            //     Export: {
            //         Name: 'SNSTopicARN'
            //     }
            // },
            SQSQueueARN: {
                Description: 'SQSQueue ARN',
                Value: {
                    // "Fn::GetAtt": ["SQSQueue", "Arn"]
                    Ref: 'SQSQueue'
                },
                Export: {
                    Name: 'SQSQueueARN'
                }
            }
        },
    },
    // import the function via paths
    // @ts-ignore
    functions: {importProductsFile, importFileParser},
};

module.exports = serverlessConfiguration;
