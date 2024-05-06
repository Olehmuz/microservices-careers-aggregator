import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CareersRepository } from './careers.repository';
import { FilterQuery } from 'mongoose';
import { Career } from './schemas/career.schema';

@Injectable()
export class CareersService {
  constructor(private readonly careersRepository: CareersRepository) {}
  create(createCareerDto: CreateCareerDto) {
    return this.careersRepository.create(createCareerDto);
  }

  findAll() {
    return this.careersRepository.find({});
  }

  findOne(filter: FilterQuery<Career>) {
    return this.careersRepository.findOne(filter);
  }

  update(id: string, updateCareerDto: UpdateCareerDto) {
    return this.careersRepository.upsert({ _id: id }, updateCareerDto);
  }

  remove(id: string) {
    return this.careersRepository.delete({ _id: id });
  }
}
