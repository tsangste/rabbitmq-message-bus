import { Injectable } from '@nestjs/common'

import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { DataDto } from './data.dto'

@Injectable()
export class App3Service {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  getHello(): string {
    return 'Hello World!'
  }

  message(data: DataDto) {
    console.log(`send - app3.${data.event}`)
    this.amqpConnection.publish('app3', `app3.${data.event}`, { msg: 'hello-app3' })
  }

  @RabbitSubscribe({
    exchange: 'app2',
    routingKey: 'app2.app3.task',
    queue: 'app2-app3-task',
  })
  public async app2WildHandler(msg: unknown) {
    console.log(`Received wild message: ${JSON.stringify(msg)}`)
  }
}
