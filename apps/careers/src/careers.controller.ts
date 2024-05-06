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
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

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

  @MessagePattern({ cmd: 'create_career' })
  async handleCreateCareer(
    @Payload(new ValidationPipe()) dto: CreateCareerDto,
  ) {
    return this.careersService.create(dto);
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
