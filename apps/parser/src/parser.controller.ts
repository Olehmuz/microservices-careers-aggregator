import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CAREERS_SERVICE } from '@app/common/constants/services';
import { ParserService } from './parser.service';

@Controller()
export class ParserController {
  constructor(
    private readonly parserService: ParserService,
    @Inject(CAREERS_SERVICE) private careersClient: ClientProxy,
  ) {}

  @Get()
  async getCareers() {
    return this.parserService.parse();
    // return this.careersClient.send({ cmd: 'get_all_careers' }, {});
  }

  @Post()
  async createCareer() {
    return this.careersClient.send(
      { cmd: 'create_career' },
      {
        title: 'full-stack developer',
        description: 'Node.js, React.js',
        location: 'Ukraine',
        company: 'Keenethics',
        url: 'someurl',
      },
    );
  }
}
