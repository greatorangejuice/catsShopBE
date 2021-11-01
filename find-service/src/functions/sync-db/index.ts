import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      cognitoUserPool: {
        pool: 'pet-shop-user-pool',
        trigger: "PostConfirmation",
        exciting: true,
      }
    },
  ]
}
