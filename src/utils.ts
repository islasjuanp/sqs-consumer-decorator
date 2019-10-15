import { Container } from 'inversify';
import { SQSConsumerAbstract } from './interfaces';
import SQS = require('aws-sdk/clients/sqs');

const Consumer = Symbol.for('Controller');

export interface ConsumerMetadata {
  queueName: string;
  target: any;
}

export interface ConsumerConfig {
  queueName: string;
  sqs?: SQS;
}

export interface ConsumerImpl {
  instance: SQSConsumerAbstract;
  queueName: string;
}

export function getConsumersFromMetadata(): ConsumerMetadata[] {
  return Reflect.getMetadata('sqs-consumer', Reflect) || [];
}

export function addConsumerToMetadata(consumer: ConsumerMetadata): void {
  // We need to create an array that contains the metadata of all
  // the controllers in the application, the metadata cannot be
  // attached to a controller. It needs to be attached to a global
  // We attach metadata to the Reflect object itself to avoid
  // declaring additonal globals. Also, the Reflect is avaiable
  // in both node and web browsers.
  const previousMetadata: ConsumerMetadata[] = getConsumersFromMetadata();

  const newMetadata = [consumer, ...previousMetadata];

  Reflect.defineMetadata('sqs-consumer', newMetadata, Reflect);
}

export function cleanConsumersMetadata(): void {
  Reflect.defineMetadata('sqs-consumer', [], Reflect);
}

export function registerConsumerToContainer(container: Container, consumer: ConsumerMetadata): void {
  const { name } = consumer.target;

  if (container.isBoundNamed(Consumer, name)) {
    throw new Error(`Duplicated consumer with name ${name}`);
  }

  container
    .bind(Consumer)
    .to(consumer.target)
    .whenTargetNamed(name);
}

export function getConsumerFromContainer(container: Container): SQSConsumerAbstract[] {
  if (container.isBound(Consumer)) {
    return container.getAll<SQSConsumerAbstract>(Consumer);
  } else {
    return [];
  }
}
