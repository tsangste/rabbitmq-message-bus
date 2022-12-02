import { Injectable } from '@nestjs/common'

import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'

import { DataDto } from './data.dto'
import { errorCallback } from './error.helper'

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

  @RabbitSubscribe({
    exchange: 'app3',
    routingKey: 'app3.app2.fail',
    queue: 'app3-app2-fail',
    errorHandler: errorCallback('app3.dead-letter', 'app3-dead-letter'),
  })
  public async app2ErrorHandler(_msg: unknown) {
    throw new Error('Test')
  }
}
