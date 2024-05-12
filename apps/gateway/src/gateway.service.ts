import { CAREERS_SERVICE } from '@app/common/constants/services';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(@Inject(CAREERS_SERVICE) private careersClient: ClientProxy) {}
  getCareers() {
    return this.careersClient.send({ cmd: 'get_all_careers' }, {});
  }
}
