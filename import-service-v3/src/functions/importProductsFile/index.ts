import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  // custom: {
  //   authorizerArn:  {'Fn::ImportValue': 'AuthorizationARN'}
  //   },
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            name: true,
          }
        },
        authorizer: {
          name: 'AuthorizerArn',
          // arn: 'arn:aws:lambda:eu-west-1:647270840484:function:authorization-service-dev-basicAuthorizer',
          // arn: '${cf:authorization-service-${self:provider.stage}.BasicAuthorizerLambdaFunctionQualifiedArn}',
          // arn: '${self:custom.authorizerArn}',
          arn: {
            'Fn::ImportValue': 'AuthorizationARN'
          },
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'token',
        }
      }
    }
  ]
}
