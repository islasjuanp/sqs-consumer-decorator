import { SQSConsumer } from '../src/consumer';
import {getConsumersFromMetadata} from "../src/utils";
import { describe, it, before } from 'mocha';
import { expect } from 'chai';

describe('Utils tests ', () => {

    before('', async () => {
    });

    it('should add controller metadata to a class when decorated with @SQSConsumer', async () => {
        @SQSConsumer('test_queue_name')
        class TestConsumer {
        }

        let consumers = getConsumersFromMetadata();
        expect(consumers.length).toBe(0);
    });
});