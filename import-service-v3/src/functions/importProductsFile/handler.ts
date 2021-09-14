import 'source-map-support/register';
import {middyfy} from '@libs/lambda';
import {formatJSONResponse} from "@libs/apiGateway";

const AWS = require('aws-sdk')
const BUCKET = 'rs-uploaded'

export const importProductsFile = async (event) => {
    const s3 = new AWS.S3({region: 'eu-west-1'});

    if (!event.queryStringParameters) {
        return formatJSONResponse({
            message: 'Filename is not exist'
        }, 400)
    }
    const fileName = event.queryStringParameters.name;

    const catalogPath = `uploadedFiles/${fileName}`
    const params = {
        Bucket: BUCKET,
        Key: catalogPath,
        ContentType: 'text/csv',
    };
    try {
        let result = '';
        await s3.getSignedUrlPromise('putObject', params).then((url) => {
            result = url
        })
        return formatJSONResponse({newUrl: result})
    } catch (e) {
        console.error(e)
        return formatJSONResponse({message: e.message}, 400)
    }
}


export const main = middyfy(importProductsFile);
