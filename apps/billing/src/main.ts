import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { BillingModule } from './billing.module';
import { BILLING_SERVICE } from '@app/common/constants/services';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice(rmqService.getOptions(BILLING_SERVICE));
  await app.startAllMicroservices();
}
bootstrap();
