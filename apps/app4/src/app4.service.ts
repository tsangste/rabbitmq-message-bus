import { Injectable } from '@nestjs/common'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'

@Injectable()
export class App4Service {
  getHello(): string {
    return 'Hello World!'
  }

  @RabbitSubscribe({
    exchange: 'app2',
    routingKey: 'app2.app1.route',
    queue: 'app4-queue',
  })
  public async app2Handler(msg: unknown) {
    console.log(`Received message: ${JSON.stringify(msg)}`)
  }

  @RabbitSubscribe({
    exchange: 'app3',
    routingKey: 'app3.app1.route',
    queue: 'app4-queue',
  })
  public async app3Handler(msg: unknown) {
    console.log(`Received message: ${JSON.stringify(msg)}`)
  }
}
