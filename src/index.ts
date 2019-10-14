import { ConsumerMetadata, getConsumersFromMetadata } from './utils';
export class SQSConsumerStarter {
  public start() {
    let consumers: ConsumerMetadata[] = getConsumersFromMetadata();
    consumers.forEach(({ target }) => console.log(target.name));
  }
}
