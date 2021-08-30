import 'source-map-support/register';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';
const AWS = require('aws-sdk')


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

const catalogBatchProcess = async (event) => {
    const sns = new AWS.SNS({region: 'eu-west-1'});

    const products = event.Records.map(({body}) => body);
    const parsedProducts = JSON.parse(products);

    const {title, price, birthday, imglink, breedid, count} = parsedProducts;
    console.log('Parsed data: ', title, price, birthday, breedid, imglink, count);

    const client = new Client(dbOptions);
    await client.connect();

    try {
        const kittens = await client.query(
            `insert into cats(title, price, birthday, imglink, breedid) values ('${title}', ${price}, '${birthday}', '${imglink}', ${breedid}) returning id`
        )
        const kittensId = kittens.rows.find(item => item).id;

        await client.query(
            `insert into kittens (cat_id, count) VALUES ('${kittensId}', ${count})`
        )
        console.log(`New kittens by ${title} added.`)
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
