import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import {Client} from 'pg';

const {PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD} = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
}

const getProducts = async (e) => {
  const client = new Client(dbOptions);
  await client.connect();
  console.log(`Get products: `, e)

  try {
    const {rows} = await client.query(
        `select p.id, p.title, p.description, p.price, p.imglink, s.count from products as p inner join stocks s on p.id = s.product_id`
    )
    return formatJSONResponse({
      products: rows,
    });
  } catch (e) {
    return formatJSONResponse({
      message: e.message,
    }, 400);
  } finally {
    client.end()
  }

}

export const main = middyfy(getProducts);
