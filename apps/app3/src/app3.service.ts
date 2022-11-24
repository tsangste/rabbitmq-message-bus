import { Injectable } from '@nestjs/common'

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

@Injectable()
export class App3Service {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getHello(): string {
    return 'Hello World!'
  }

  message() {
    this.amqpConnection.publish('app3', 'app3-route', { msg: 'hello-app3' })
  }
}
