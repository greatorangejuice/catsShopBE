import 'source-map-support/register';

import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';

import {Client} from 'pg';
import {dbOptions} from "../../constants/db-options";

export const getProductById = async (e) => {
    const client = new Client(dbOptions);
    await client.connect();
    console.log(`Get toy by id: `, e)

    try {
        const toyId = e.pathParameters.id;
        const {rows} = await client.query(
            `select p.id, p.title, p.description, p.price, s.count from products as p inner join stocks s on p.id = s.product_id
             where p.id = '${toyId}'`
        )
        if (rows.length !== 0) {
            return formatJSONResponse({
                product: rows[0],
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

export const main = middyfy(getProductById);
