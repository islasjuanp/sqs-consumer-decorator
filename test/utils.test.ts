import * as utils from '../src/utils';
import { ConsumerMetadata } from '../src/utils';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import { Container } from 'inversify';
import { SQSConsumer, SQSError, TimeoutError, SQSMessage, SQSConsumerAbstract } from '../src';

describe('Utils tests ', () => {
  let container: Container;

  before('', () => {
    container = new Container();
    utils.cleanConsumersMetadata();
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

    let consumers: ConsumerMetadata[] = utils.getConsumersFromMetadata();
    expect(consumers.length).to.be.equal(1);
  });

  it('should have the correct name and queueName when decorated with @SQSConsumer', () => {
    let randomQueueName: string = Math.random().toString(36);

    @SQSConsumer(randomQueueName)
    class TestRandomConsumer {}

    //@ts-ignore
    let consumer: ConsumerMetadata = utils
      .getConsumersFromMetadata()
      .find(consumer => consumer.queueName === randomQueueName);

    expect(consumer.queueName).to.be.equal(randomQueueName);
    expect(consumer.target.name).to.be.equal('TestRandomConsumer');
  });

  it('should be able to register a consumer to a container', () => {
    let consumer: ConsumerMetadata = utils.getConsumersFromMetadata()[0];

    utils.registerConsumerToContainer(container, consumer);
  });

  it('should be able to get a registered consumer from a container', () => {
    let instances: SQSConsumerAbstract[] = utils.getConsumerFromContainer(container);

    expect(instances.length).to.be.greaterThan(0);
    instances.forEach(instance => {
      expect(instance.queueName).to.be.a('string');
    })
  });
});
