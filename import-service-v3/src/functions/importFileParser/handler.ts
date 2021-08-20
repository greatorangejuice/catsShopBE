import 'source-map-support/register';
import {middyfy} from '@libs/lambda';
import {formatJSONResponse} from "@libs/apiGateway";
import * as csv from "csv-parser";

const AWS = require('aws-sdk')
const BUCKET = 'rs-uploaded'

const importFileParser = async () => {
    const s3 = new AWS.S3({region: 'eu-west-1'});
    let results = [];
    const getObjectParams = {
        Bucket: BUCKET,
        Key: 'uploadedFiles/',
    }

    const listObjectsParams = {
        Bucket: BUCKET,
        Prefix: 'uploadedFiles/',
    }

    try {
        const s3response = await s3.listObjectsV2(listObjectsParams).createReadStream()
        results = s3response.Contents.filter(item => item.Size)
        console.log(results)
        console.log('STREAM')
        // Тянем адрес файлика и парсим.
        s3.getObject(getObjectParams)
            .createReadStream()
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log('RESULTS IN STREAM', results);
            });
    } catch (e) {
        console.error(e.message)
    }

    // console.log('GetObject')
    // const response = await s3.getObject(getObjectParams).promise();
    // const fileContent = response.Body.toString('utf-8');
    // console.log(fileContent)
    // s3.getObject(getObjectParams, (err, data) => {
    //     console.log('IN GETOBJECT FUNC')
    //     if (err) console.log(err, err.stack)
    //     else console.log('DATA IN GET OBJECT: ', data)
    // });

    // console.log('Get ListObjectsV2')
    // const filesList = await s3.listObjectsV2(listObjectsParams).promise()
    // console.log('FILELIST CONTENTS: ', filesList.Contents)


    // fs.createReadStream('uploadedFiles/testFile.csv')
    //     .pipe(csvParser())
    //     .on('data', (data) => results.push(data))
    //     .on('end', () => {
    //         console.log('RESULTS IN STREAM', results);
    //     });
    return formatJSONResponse({message: 'All works'}, 200)
}


export const main = middyfy(importFileParser);
