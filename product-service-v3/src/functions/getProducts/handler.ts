import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

import {Client} from 'pg';

import {dbOptions} from "../../constants/db-options";


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
