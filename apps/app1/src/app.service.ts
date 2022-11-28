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
        this.httpService.post('http://app2:3000/', { event: 'app1.route' }).pipe(map(response => response.data)),
        this.httpService.post('http://app3:3000/', { event: 'app1.route' }).pipe(map(response => response.data)),
      ])
    )
  }

  @RabbitSubscribe({
    exchange: 'app2',
    routingKey: 'app2.app1.route',
    queue: 'app1-queue',
  })
  public async app2Handler(msg: unknown) {
    console.log(`Received message: ${JSON.stringify(msg)}`)
  }

  @RabbitSubscribe({
    exchange: 'app3',
    routingKey: 'app3.app1.route',
    queue: 'app1-queue',
  })
  public async app3Handler(msg: unknown) {
    console.log(`Received message: ${JSON.stringify(msg)}`)
  }
}
