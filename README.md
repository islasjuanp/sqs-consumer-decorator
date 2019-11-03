# sqs-consumer-decorator
Built on top of `sqs-consumer` in order to make it easy to instantiate 
consumers using `typescrypt` and `inversify`

## Installation 

You can install sqs-consumer-decorator using npm:
```bash
  npm install inversify sqs-consumer-decorator reflect-metadata --save
```

## Basic usage 

```typescript
import { SQSConsumer, SQSConsumerAbstract, SQSError, TimeoutError, SQSMessage } from 'sqs-consumer-decorator'

@SQSConsumer('test_queue_name')
class TestConsumer extends SQSConsumerAbstract {
  
  /**
  * Executed when a message is successfully processed and removed from the queue.
  * @param message
  */
  async handleMessage(message: SQSMessage): Promise<void> {
    return undefined;
  }
  
  /**
  * Executed when an error occurs interacting with the queue. 
  * If the error correlates to a message, that error is included in Params
  * @param error
  */
  async handleError(error: SQSError): Promise<void> {
    return undefined;
  }
  
  /**
  * Executed when an error occurs processing the message.
  * @param error
  */
  async handleProcessingError(error: Error): Promise<void> {
    return undefined;
  }

  /**
  * Executed when handleMessageTimeout is supplied as an 
  * option and if handleMessage times out.
  * @param error
  */
  async handleTimeoutError(error: TimeoutError): Promise<void> {
    return undefined;
  }
}
```

```typescript
import { SQSConsumerStarter } from 'sqs-consumer-decorator'
import { Container } from 'inversify'


let container: Container = new Container();
let starter: SQSConsumerStarter = new SQSConsumerStarter(container);
starter.build();
starter.start();
```