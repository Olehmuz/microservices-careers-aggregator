import { Controller, Inject } from '@nestjs/common';
import { ParserService } from './parser.service';
import { CAREERS_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class ParserController {
  constructor(
    private readonly parserService: ParserService,
    @Inject(CAREERS_SERVICE) private careersClient: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async parseCareers() {
    console.log('Parsing careers...');
    return this.parserService.parse();
  }
}
