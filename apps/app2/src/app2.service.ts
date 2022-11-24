import { Injectable } from '@nestjs/common'

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

@Injectable()
export class App2Service {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getHello(): string {
    return 'Hello World!'
  }

  message() {
    this.amqpConnection.publish('app2', 'app2-route', { msg: 'hello-app2' })
  }
}
