// rabbitmq.options.ts
import {
  ClientProxyFactory,
  Transport,
  RmqOptions,
} from '@nestjs/microservices';

export const RABBITMQ_URL = 'amqp://localhost:5672';

export function getRmqOptions(queue: string): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue,
      queueOptions: {
        durable: false,
      },
    },
  };
}

export const RABBITMQ_QUEUE = 'user_queue';

export const rabbitMQClient = ClientProxyFactory.create(
  getRmqOptions(RABBITMQ_QUEUE),
);
