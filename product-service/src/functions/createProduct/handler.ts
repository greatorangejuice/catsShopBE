import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';
import {IToy, ToySchema} from "../../models/toy";

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
    // const {title, price, birthday, breedid, imglink, count} = e.body;
    // const cat: ICat = {title, price, birthday, breedid, imglink, count};

    const {title, price, description, imglink, count} = e.body;
    const toy: Omit<IToy, 'id'> = {title, price, description, imglink, count};
    console.log(toy)
    let isDataValid = true;

    try {
        await ToySchema.isValid(toy).then((isValid) => {
            isDataValid = isValid
        })
        if (!isDataValid) {
            return formatJSONResponse({
                message: `Insert data is invalid`,
            }, 400);
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
