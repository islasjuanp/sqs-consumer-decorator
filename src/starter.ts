import { ConsumerMetadata } from './utils';
import * as utils from './utils';
import { Container } from 'inversify';
import { SQSConsumerAbstract } from './consumer';
import * as SQS from 'aws-sdk/clients/sqs';

export class SQSConsumerStarter {
  readonly _container: Container;
  private _instances: SQSConsumerAbstract[];

  constructor(container: Container) {
    this._container = container;
    this._instances = [];
  }

  public build(): SQSConsumerAbstract[] {
    let consumers: ConsumerMetadata[] = utils.getConsumersFromMetadata();

    consumers.forEach(consumer => {
      utils.registerConsumerToContainer(this._container, consumer);
    });

    this._instances = utils.getConsumerFromContainer(this._container);

    return this._instances;
  }

  public start(sqs?: SQS) {
    this._instances.forEach(consumer => {
      return consumer.start(sqs);
    });
  }
}
