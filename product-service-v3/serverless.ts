import type {AWS} from '@serverless/typescript';

import {createProduct, getProductById, getProducts, catalogBatchProcess} from './src/functions';

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
            SNS_TOPIC_ARN: {
                Ref: 'SNSTopic'
            }
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 'sns:*',
                Resource: {
                    'Ref': 'SNSTopic'
                }
            }
        ],
        lambdaHashingVersion: '20201221',
    },
    resources: {
        Resources: {
            ['SNSTopic']: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    ['TopicName']: 'createProductTopic',
                }
            },
            ['SNSSubscriptionSuccess']: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'garagebrothersindahouse@gmail.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic'
                    },
                    FilterPolicy: {
                        status: ["success"]
                    }
                }
            },
            SNSSubscriptionLost: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'psnigirev@elinext.com',
                    Protocol: 'email',
                    TopicArn: {
                        Ref: 'SNSTopic'
                    },
                    FilterPolicy: {
                        status: ["lost"]
                    }
                }
            },
        }
    },
    functions: {getProducts, getProductById, createProduct, catalogBatchProcess}
}

module.exports = serverlessConfiguration;
