import 'source-map-support/register';
import {middyfy} from '@libs/lambda';
import {Client} from 'pg';
import {dbOptions} from "../../constants/db-options";

const AWS = require('aws-sdk')

export enum FilterType {
    success = 'success',
    lost = 'lost'
}

export const catalogBatchProcess = async (event) => {
    const sns = new AWS.SNS({region: 'eu-west-1'});
    const products = event.Records.map(({body}) => body);
    const parsedProducts = JSON.parse(products);
    const {title, price, description, imglink, count} = parsedProducts;
    console.log('Parsed data: ', title, price, imglink, description, count);

    const client = new Client(dbOptions);
    await client.connect();

    let message;
    const mapEmailMessage = (subject: string, message: string, filterValue: FilterType) => {
        return {
            Subject: `${subject}`,
            Message: `${message}`,
            TopicArn: process.env.SNS_TOPIC_ARN,
            MessageAttributes: {
                status: {
                    DataType: "String",
                    StringValue: filterValue,
                },
            },
        }
    }
    try {


        const products = await client.query(
            `insert into products(title, price, description, imglink) values ('${title}', ${price}, '${description}', '${imglink}') returning id`
        )
        const productId = products.rows.find(item => item).id;

        await client.query(
            `insert into stocks (product_id, count) VALUES ('${productId}', ${count})`
        )
        console.log(`New toys added.`)
        message = mapEmailMessage('New products was added in database', JSON.stringify(parsedProducts), FilterType.success)
        sns.publish(message, () => {
            console.log('Send email for: ', JSON.stringify(parsedProducts));
        })

    } catch (e) {
        console.error(e.message)
        message = mapEmailMessage('Failed to send new products', 'Hello, you should check error on catalogBatchProcess', FilterType.lost)
        sns.publish(message, () => {
            console.log('Send email for ERROR');
        })
    } finally {
        client.end()
    }
}


export const main = middyfy(catalogBatchProcess);
