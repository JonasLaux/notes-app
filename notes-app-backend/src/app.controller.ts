import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health Check' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service is up and running',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Service is down',
  })
  health(): string {
    return 'OK';
  }
}
