import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
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

  @Get()
  @MessagePattern({ cmd: 'get_all_careers' })
  async getAllCareers() {
    return this.careersService.findAll();
  }

  @Get(':id')
  async getCareerById(@Param('id') id: string) {
    return this.careersService.findOne({ _id: id });
  }

  @Post()
  async createCareer(@Body() dto: CreateCareerDto) {
    return this.careersService.create(dto);
  }

  @EventPattern('create_careers')
  handleParsedCareers(
    @Payload(new ValidationPipe()) dtos: CreateCareerDto[],
    @Ctx() context: RmqContext,
  ) {
    this.careersService.createCareersFromParsedData(dtos);
    this.rmqService.ack(context);
  }

  @Patch(':id')
  async updateCareer(@Param('id') id: string, @Body() dto: UpdateCareerDto) {
    return this.careersService.update(id, dto);
  }

  @Delete(':id')
  async deleteCareer(@Param('id') id: string) {
    return this.careersService.remove(id);
  }
}
