import {importProductsFile} from "@functions/importProductsFile/handler";
import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

test('getProductsById should return response with empty cats array and message with Cat not found', async () => {
    const mockedFilename = 'test-filename'
    const mockedSignedUrl = `https://rs-uploaded.s3.eu-west-1.amazonaws.com/uploadedFiles/${mockedFilename}`
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('S3', 'getSignedUrl', mockedSignedUrl)

    const result = await importProductsFile({
        queryStringParameters: {
            name: mockedFilename,
        }
    })
    const url = result.body;
    expect(url).toEqual(`"${mockedSignedUrl}"`);
});
