import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';
import {ICat, CatSchema} from "../../models/cat";

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

export const createProduct = async (e) => {
    const client = new Client(dbOptions);
    await client.connect();
    const {title, price, birthday, breedid, imglink, count} = e.body;
    const cat: ICat = {title, price, birthday, breedid, imglink, count};
    let isDataValid = true;


    try {
        await CatSchema.isValid(cat).then((isValid) => {
            isDataValid = isValid
        })
        if (!isDataValid) {
            return formatJSONResponse({
                message: `Insert data is invalid`,
            }, 400);
        }

        const kittens = await client.query(
            `insert into cats(title, price, birthday, imglink, breedid) values ('${title}', ${price}, '${birthday}', '${imglink}', ${breedid}) returning id`
        )
        const kittensId = kittens.rows.find(item => item).id;

        await client.query(
            `insert into kittens (cat_id, count) VALUES ('${kittensId}', ${count})`
        )

        return formatJSONResponse({
            message: `New kittens by ${title} added.`
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
