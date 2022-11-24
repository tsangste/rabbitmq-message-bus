import { Controller, Get, Post } from '@nestjs/common'
import { App2Service } from './app2.service'

@Controller()
export class App2Controller {
  constructor(private readonly app2Service: App2Service) {}

  @Get()
  getHello(): string {
    return this.app2Service.getHello()
  }

  @Post()
  message() {
    this.app2Service.message()
  }
}
