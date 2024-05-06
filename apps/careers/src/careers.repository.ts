import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { Career } from './schemas/career.schema';

@Injectable()
export class CareersRepository extends AbstractRepository<Career> {
  protected readonly logger = new Logger(CareersRepository.name);

  constructor(
    @InjectModel(Career.name) CareerModel: Model<Career>,
    @InjectConnection() connection: Connection,
  ) {
    super(CareerModel, connection);
  }
}
