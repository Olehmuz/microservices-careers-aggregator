import Parser from 'rss-parser';
import { IParseStrategy } from './strategies/parse-strategy.inteface';
import { RssParseStrategy } from './strategies/rss.strategy';
import { Inject } from '@nestjs/common';
import { CAREERS_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCareerDto } from 'apps/careers/src/dto/create-career.dto';

export class ParserService {
  private strategies: IParseStrategy[] = [
    new RssParseStrategy('https://djinni.co/jobs/rss'),
  ];

  constructor(@Inject(CAREERS_SERVICE) private careersClient: ClientProxy) {}

  addStrategy(strategy: IParseStrategy) {
    this.strategies.push(strategy);
  }

  private readonly parser = new Parser();
  async parse() {
    const results: CreateCareerDto[] = [];
    for (const strategy of this.strategies) {
      const result = await strategy.parse();
      results.push(...result);
    }

    await this.careersClient.emit('create_careers', results);

    return results;
  }
}
