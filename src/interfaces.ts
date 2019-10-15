import { Consumer, ConsumerOptions } from 'sqs-consumer';
import { SQS } from 'aws-sdk';
import { SQSError, TimeoutError } from 'sqs-consumer/dist/errors';
import { injectable } from 'inversify';

@injectable()
export abstract class SQSConsumerAbstract {
  private consumer: Consumer | undefined;
  //@ts-ignore Defined on @SQSConsumer decorator
  public queueName: string;

  public start(sqs?: SQS): void {
    if (this.consumer !== undefined && !this.consumer.isRunning) {
      let options: ConsumerOptions = {
        queueUrl: this.queueName,
        handleMessage: this.handleMessage,
      };

      if (sqs !== undefined) {
        options = { sqs: sqs, ...options };
      }

      this.consumer = Consumer.create(options);

      this.consumer.on('error', async err => {
        await this.handleError(err);
      });

      this.consumer.on('processing_error', async err => {
        await this.handleProcessingError(err);
      });

      this.consumer.on('timeout_error', async err => {
        await this.handleTimeoutError(err);
      });
    }
  }

  public stop(): void {
    if (this.consumer !== undefined) {
      this.consumer.stop();
    }
  }

  public abstract async handleMessage(message: SQS.Message): Promise<void>;
  public abstract async handleError(error: SQSError): Promise<void>;
  public abstract async handleProcessingError(error: Error): Promise<void>;
  public abstract async handleTimeoutError(error: TimeoutError): Promise<void>;
}



