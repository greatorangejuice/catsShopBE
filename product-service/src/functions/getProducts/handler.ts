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

const getCats = async (e) => {
    const client = new Client(dbOptions);
    await client.connect();
    console.log(`Get cats: `, e)

    try {
        const {rows} = await client.query(
            `select cats.id, cats.title, cats.price, cats.birthday, cats.imgLink as imgLink, b.title as breed, b.description, k.count from cats inner join breeds b on b.id = cats.breedid inner join kittens k on cats.id = k.cat_id;`
        )
        return formatJSONResponse({
            cats: rows,
        });
    } catch (e) {
        return formatJSONResponse({
            message: e.message,
        }, 400);
    } finally {
        client.end()
    }

}

export const main = middyfy(getCats);
