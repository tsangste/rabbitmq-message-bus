import { Injectable } from '@nestjs/common'

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { DataDto } from './data.dto'

@Injectable()
export class App3Service {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getHello(): string {
    return 'Hello World!'
  }

  message(data: DataDto) {
    this.amqpConnection.publish('app3', `app3.${data.event}`, { msg: 'hello-app3' })
  }
}
