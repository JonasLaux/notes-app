import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  @HttpCode(HttpStatus.OK)
  health(): string {
    return 'OK';
  }
}
