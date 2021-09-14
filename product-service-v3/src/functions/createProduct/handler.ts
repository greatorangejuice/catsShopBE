import 'source-map-support/register';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';

import schema from './schema';

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

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (e) => {
    const client = new Client(dbOptions);
    await client.connect();

    let {title, price, description, imglink, count} = e.body;
    console.log('Create product', e)
    try {
        if (!imglink) {
            imglink = 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
        }

        const toys = await client.query(
            `insert into products(title, price, description, imglink) values ('${title}', ${price}, '${description}','${imglink}') returning id`
        )
        const toyId = toys.rows.find(item => item).id;

        await client.query(
            `insert into stocks (product_id, count) VALUES ('${toyId}', ${count})`
        )

        return formatJSONResponse({
            message: `New toy ${title} added.`
        });
    } catch (e) {
        return formatJSONResponse({
            message: `${e.message}`,
        }, 500);
    } finally {
        client.end()
    }
}

export const main = middyfy(createProduct);
