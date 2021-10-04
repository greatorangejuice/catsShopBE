export default {
    handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
    events: [
        {
            sqs: {
                batchSize: 5,
                // arn: {
                //     "Fn::ImportValue": 'SQSQueueARN'
                // }
                arn: 'arn:aws:sqs:eu-west-1:647270840484:import-service-sqs-parse',
            }
        }
    ]
}
