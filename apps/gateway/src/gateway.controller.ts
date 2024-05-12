import { Controller, Get, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { JwtAuthGuard } from '@app/common';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('careers')
  @UseGuards(JwtAuthGuard)
  getCareers() {
    return this.gatewayService.getCareers();
  }
}
