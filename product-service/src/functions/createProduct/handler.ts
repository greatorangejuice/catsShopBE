import 'source-map-support/register';

import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import schema from './schema';
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

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (e) => {
    const client = new Client(dbOptions);
    await client.connect();
    const {name, price, birthday, breedid, imglink, count} = e.body;

    try {
        const kittens = await client.query(
            `insert into cats(name, price, birthday, imglink, breedid) values ('${name}', ${price}, '${birthday}', '${imglink}', ${breedid}) returning id`
        )
        const kittensId = kittens.rows.find(item => item).id;

        await client.query(
            `insert into kittens (cat_id, count) VALUES ('${kittensId}', ${count})`
        )

        return formatJSONResponse({
            message: `New kittens by ${name} added.`
        });
    } catch (e) {
        return formatJSONResponse({
            message: `${e.message}`,
            code: 'BAD REQUEST'
        });
    } finally {
        client.end()
    }

}

export const main = middyfy(createProduct);
