import 'source-map-support/register';
import {middyfy} from '@libs/lambda';
import {formatJSONResponse} from "@libs/apiGateway";
import * as csv from "csv-parser";

const AWS = require('aws-sdk')
const BUCKET = 'rs-uploaded'

const importFileParser = async () => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    let results = [];

    const listObjectsParams = {
        Bucket: BUCKET,
        Prefix: 'uploadedFiles/',
    }

    try {
        const s3response = await s3.listObjectsV2(listObjectsParams).promise()
        results = s3response.Contents.filter(item => item.Size)
        const getObjectParams = {
            Bucket: BUCKET,
            Key: '',
        }
        if (results[0] && results[0].Size) {
            getObjectParams.Key = results[0]['Key'];
        }
        await s3.getObject(getObjectParams)
            .createReadStream()
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log('RESULTS IN STREAM', results);
            })
        await s3.copyObject({Bucket: BUCKET, CopySource: BUCKET + '/' + getObjectParams.Key, Key: getObjectParams.Key.replace('uploadedFiles', 'parsed')}).promise()
        await s3.deleteObject(({Bucket: BUCKET, Key: getObjectParams.Key})).promise()

    } catch (e) {
        console.error(e.message)
    }

    return formatJSONResponse({message: 'All works'}, 202)
}


export const main = middyfy(importFileParser);
