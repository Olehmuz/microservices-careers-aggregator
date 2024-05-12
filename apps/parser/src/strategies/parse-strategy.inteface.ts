import { CreateCareerDto } from 'apps/careers/src/dto/create-career.dto';

export interface IParseStrategy {
  parse(): Promise<CreateCareerDto[]>;
}
