import { ConsumerMetadata } from './utils';
import * as utils from './utils';
import { Container } from 'inversify';
import { SQSConsumerAbstract } from './interfaces';

export class SQSConsumerStarter {
  private _container: Container;

  constructor(container: Container) {
    this._container = container;
  }

  public start() {
    let consumers: ConsumerMetadata[] = utils.getConsumersFromMetadata();

    consumers.forEach(consumer => {
      utils.registerConsumerToContainer(this._container, consumer);
    });

    let consumerInstances: SQSConsumerAbstract[] = utils.getConsumerFromContainer(this._container);

    consumerInstances.forEach(consumer => {
      // TODO: start all the consumers
      // return consumer.start();
    });
  }
}
