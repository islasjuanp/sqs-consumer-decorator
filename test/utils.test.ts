import { SQSConsumer } from '../src/consumer';
import {getConsumersFromMetadata} from "../src/utils";
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Utils tests ', () => {

    it('should add controller metadata to a class when decorated with @SQSConsumer', () => {
        @SQSConsumer('test_queue_name')
        class TestConsumer {
        }

        let consumers = getConsumersFromMetadata();
        expect(consumers.length).to.be.greaterThan(0);
    });

});