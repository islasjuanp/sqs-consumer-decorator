export interface ConsumerMetadata {
  queueName: string;
  target: any;
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
