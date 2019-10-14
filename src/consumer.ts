import { injectable, decorate } from 'inversify';
import 'reflect-metadata';
import { addConsumerToMetadata, ConsumerMetadata } from './utils';

export function SQSConsumer(queueName: string) {
  return function(target: any) {
    let currentMetadata: ConsumerMetadata = {
      queueName: queueName,
      target: target,
    };

    decorate(injectable(), target);
    addConsumerToMetadata(currentMetadata);
  };
}
