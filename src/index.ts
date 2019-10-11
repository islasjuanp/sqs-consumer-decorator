import { SQS } from 'aws-sdk';

export function SQSConsumer(sqsClient: SQS) {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      sqsClient = sqsClient;
    };
  };
}

export function Subscriber(queueName: string) {
  return function(target: any, key: string, descriptor: any) {
    console.log(target);
  };
}
