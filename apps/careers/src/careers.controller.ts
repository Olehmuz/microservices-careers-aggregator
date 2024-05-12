import { Controller, ValidationPipe } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller('careers')
export class CareersController {
  constructor(
    private readonly careersService: CareersService,
    private readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: 'get_all_careers' })
  async getAllCareers() {
    return this.careersService.findAll();
  }

  @EventPattern('create_careers')
  handleParsedCareers(
    @Payload(new ValidationPipe()) dtos: CreateCareerDto[],
    @Ctx() context: RmqContext,
  ) {
    this.careersService.createCareersFromParsedData(dtos);
    this.rmqService.ack(context);
  }
}
