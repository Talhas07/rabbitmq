import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRmqOptions } from './rmq/rmq.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(getRmqOptions('user_queue'));
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
