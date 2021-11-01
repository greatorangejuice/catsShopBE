import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const syncDb: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  console.log('FIND SERVICE START')
  console.log('EVENT: ', event)
  // @ts-ignore
  console.log('EVENT TRIGGER SOURCE: ', event.triggerSource)
  return formatJSONResponse({
    message: `All works`,
    event,
  });
}

export const main = middyfy(syncDb);
