import 'source-map-support/register';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';
import {dbOptions} from "../../constants/db-options";

const AWS = require('aws-sdk')



export const catalogBatchProcess = async (event) => {
    const sns = new AWS.SNS({region: 'eu-west-1'});
    const products = event.Records.map(({body}) => body);
    const parsedProducts = JSON.parse(products);
    const {title, price, description, imglink, count} = parsedProducts;
    console.log('Parsed data: ', title, price, imglink, description, count);

    const client = new Client(dbOptions);
    await client.connect();

    try {
        const products = await client.query(
            `insert into products(title, price, description, imglink) values ('${title}', ${price}, '${description}', '${imglink}') returning id`
        )
        const productId = products.rows.find(item => item).id;

        await client.query(
            `insert into stocks (product_id, count) VALUES ('${productId}', ${count})`
        )
        console.log(`New toys added.`)
        sns.publish({
            Subject: 'New products was added in database',
            Message: JSON.stringify(parsedProducts),
            TopicArn: process.env.SNS_ARN
        }, () => {
            console.log('Send email for: ', JSON.stringify(parsedProducts));
        })

    } catch (e) {
        console.error(e.message)
    } finally {
        client.end()
    }
}


export const main = middyfy(catalogBatchProcess);
