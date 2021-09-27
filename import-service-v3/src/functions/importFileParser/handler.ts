import 'source-map-support/register';
import {middyfy} from '@libs/lambda';
import * as csv from "csv-parser";

const AWS = require('aws-sdk')
const BUCKET = 'rs-uploaded'

const importFileParser = async () => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    const sqs = new AWS.SQS();
    const results = [];

    const listObjectsParams = {
        Bucket: BUCKET,
        Prefix: 'uploadedFiles/',
    }

    try {
        const s3response = await s3.listObjectsV2(listObjectsParams).promise()
        const content = s3response.Contents.filter(item => item.Size)
        const getObjectParams = {
            Bucket: BUCKET,
            Key: '',
        }
        if (content[0] && content[0].Size) {
            getObjectParams.Key = content[0]['Key'];
        }
        await s3.getObject(getObjectParams)
            .createReadStream()
            .pipe(csv())
            .on('data', (product) => {
                console.log('DATA AT STREAM: ', product)
                sqs.sendMessage({
                    QueueUrl: process.env.SQS_URL,
                    MessageBody: JSON.stringify(product)
                }, (err, data) => {
                    console.log('Error: ', err)
                    console.log('Data: ', data)
                })
                // results.push(data);
                // results.forEach(product => {
                //     sqs.sendMessage({
                //         QueueUrl: process.env.SQS_URL,
                //         MessageBody: JSON.stringify(product)
                //     }, (err, data) => {
                //         console.log('Error: ', err)
                //         console.log('Data: ', data)
                //     })
                // })
            })
            .on('end', async () => {
                console.log('END STREAM');

            })
            .on('error', (err) => {
                console.log(`Error: ${err}`)
            })

        await s3.copyObject({
            Bucket: BUCKET,
            CopySource: BUCKET + '/' + getObjectParams.Key,
            Key: getObjectParams.Key.replace('uploadedFiles', 'parsed')
        }).promise()
        await s3.deleteObject(({Bucket: BUCKET, Key: getObjectParams.Key})).promise()
    } catch (e) {
        console.error(e.message)
    }

}


export const main = middyfy(importFileParser);
