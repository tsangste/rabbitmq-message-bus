import { Body, Controller, Get, Post } from '@nestjs/common'
import { App3Service } from './app3.service'
import { DataDto } from './data.dto'

@Controller()
export class App3Controller {
  constructor(private readonly app3Service: App3Service) {}

  @Get()
  getHello(): string {
    return this.app3Service.getHello()
  }

  @Post()
  message(@Body() data: DataDto) {
    this.app3Service.message(data)
  }
}
