import { SQSConsumer } from '../src/index';
import { SQS } from 'aws-sdk';

test('SQS Consumer', () => {
    const sqs = new SQS({
        region: 'your aws region',
        endpoint: 'your aws endpoint',
        // Credentials can be used with YOPA as below
        // credentials: new Credentials({
        //   accessKeyId: 'x',
        //   secretAccessKey: 'x',
        // }),
    });

    let consumer = SQSConsumer(sqs);

    console.log(consumer)
});