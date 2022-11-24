import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { forkJoin, lastValueFrom, map } from 'rxjs'

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async sendMessage() {
    await lastValueFrom(
      forkJoin([
        this.httpService.post('http://localhost:3001/').pipe(map(response => response.data)),
        this.httpService.post('http://localhost:3002/').pipe(map(response => response.data)),
      ])
    )
  }

  @RabbitSubscribe({
    exchange: 'app2',
    routingKey: 'app2-route',
    queue: 'app2-queue',
  })
  public async app2Handler(msg: unknown) {
    console.log(`Received message: ${JSON.stringify(msg)}`)
  }

  @RabbitSubscribe({
    exchange: 'app3',
    routingKey: 'app3-route',
    queue: 'app3-queue',
  })
  public async app3Handler(msg: unknown) {
    console.log(`Received message: ${JSON.stringify(msg)}`)
  }
}
