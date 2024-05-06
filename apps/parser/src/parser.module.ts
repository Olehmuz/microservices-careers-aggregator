import { Module } from '@nestjs/common';
import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
import { RmqModule } from '@app/common';
import { CAREERS_SERVICE } from '../../../libs/common/src/constants/services';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/parser/.env',
    }),
    RmqModule.register({
      name: CAREERS_SERVICE,
    }),
  ],
  controllers: [ParserController],
  providers: [ParserService],
})
export class ParserModule {}
