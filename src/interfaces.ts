import { SQS } from "aws-sdk";
export { SQSError, TimeoutError } from "sqs-consumer/dist/errors";

export interface SQSMessage extends SQS.Message {}
