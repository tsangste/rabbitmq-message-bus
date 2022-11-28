import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { DataDto } from './data.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post()
  sendMessage(@Body() data: DataDto) {
    return this.appService.sendMessage(data)
  }
}
