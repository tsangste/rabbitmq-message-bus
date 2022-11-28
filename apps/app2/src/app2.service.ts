import { Injectable } from '@nestjs/common'

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { DataDto } from './data.dto'

@Injectable()
export class App2Service {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getHello(): string {
    return 'Hello World!'
  }

  message(data: DataDto) {
    console.log(`send - app2.${data.event}`)
    this.amqpConnection.publish('app2', `app2.${data.event}`, { msg: 'hello-app2' })
  }
}
