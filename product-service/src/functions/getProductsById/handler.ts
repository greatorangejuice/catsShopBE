import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
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

export const getCatById = async (e) => {
    const client = new Client(dbOptions);
    await client.connect();
    console.log(`Get toy by id: `, e)

    try {
        const toyId = e.pathParameters.id;
        const {rows} = await client.query(
            `select p.title, p.description, p.price, s.count from products as p inner join stocks s on p.id = s.product_id
             where p.id = '${toyId}'`
        )
        if (rows.length !== 0) {
            return formatJSONResponse({
                cats: rows,
            }, 200);
        } else {
            return formatJSONResponse({
                message: 'Toy was not found'
            }, 404);
        }

    } catch (e) {
        return formatJSONResponse({
            message: e.message,
        }, 404);
    } finally {
        client.end()
    }

}

export const main = middyfy(getCatById);
