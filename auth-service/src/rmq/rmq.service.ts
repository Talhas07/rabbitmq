// rabbitmq.options.ts
import { Transport, RmqOptions } from '@nestjs/microservices';

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
