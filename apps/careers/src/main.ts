import { NestFactory } from '@nestjs/core';
import { CareersModule } from './careers.module';
import { RmqService } from '@app/common';
import { CAREERS_SERVICE } from '@app/common/constants/services';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CareersModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(CAREERS_SERVICE));
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
