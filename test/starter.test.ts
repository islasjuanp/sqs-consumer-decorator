import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import { Container } from 'inversify';
import { SQSConsumer, SQSConsumerStarter, SQSMessage, SQSError, TimeoutError, SQSConsumerAbstract } from '../src';

describe('SQS Consumer Starter tests ', () => {
  let container: Container;

  before('', () => {
    container = new Container();
  });

  it('should add controller metadata to a class when decorated with @SQSConsumer', () => {
    @SQSConsumer('test_queue_name')
    class TestConsumer extends SQSConsumerAbstract {
      async handleError(error: SQSError): Promise<void> {
        return undefined;
      }

      async handleMessage(message: SQSMessage): Promise<void> {
        return undefined;
      }

      async handleProcessingError(error: Error): Promise<void> {
        return undefined;
      }

      async handleTimeoutError(error: TimeoutError): Promise<void> {
        return undefined;
      }
    }

  });

  it('should be able to initialize and build SQSConsumerStarter', () => {
    let starter: SQSConsumerStarter = new SQSConsumerStarter(container);
    let instances: SQSConsumerAbstract[]  = starter.build();

    expect(instances[0].queueName).to.be.equal('test_queue_name')
  });

});
