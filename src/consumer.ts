import { SQS } from 'aws-sdk';
import { Consumer, ConsumerOptions } from 'sqs-consumer';
import { SQSError, TimeoutError, SQSMessage } from './interfaces';
import { injectable } from 'inversify';
import 'reflect-metadata'

@injectable()
export abstract class SQSConsumerAbstract {
  private consumer: Consumer | undefined;
  //@ts-ignore Defined on @SQSConsumer decorator
  public queueName: string;

  /**
   * Executed when a message is successfully processed and removed from the queue.
   * @param message
   */
  public abstract async handleMessage(message: SQSMessage): Promise<void>;

  /**
   * Executed when an error occurs interacting with the queue.
   * If the error correlates to a message, that error is included in Params
   * @param error
   */
  public abstract async handleError(error: SQSError): Promise<void>;

  /**
   * Executed when an error occurs processing the message.
   * @param error
   */
  public abstract async handleProcessingError(error: Error): Promise<void>;

  /**
   * Executed when handleMessageTimeout is supplied as an
   * option and if handleMessage times out.
   * @param error
   */
  public abstract async handleTimeoutError(error: TimeoutError): Promise<void>;

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
}