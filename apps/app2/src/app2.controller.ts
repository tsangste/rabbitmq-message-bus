import { Body, Controller, Get, Post } from '@nestjs/common'
import { App2Service } from './app2.service'
import { DataDto } from './data.dto'

@Controller()
export class App2Controller {
  constructor(private readonly app2Service: App2Service) {}

  @Get()
  getHello(): string {
    return this.app2Service.getHello()
  }

  @Post()
  message(@Body() data: DataDto) {
    this.app2Service.message(data)
  }
}
