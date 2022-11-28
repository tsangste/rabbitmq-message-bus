import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { forkJoin, lastValueFrom, map } from 'rxjs'
import { DataDto } from './data.dto'

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async sendMessage(data: DataDto) {
    const payload = { event: data?.event ?? 'app1.relay' }
    await lastValueFrom(
      forkJoin([
        this.httpService.post('http://app2:3000/', payload).pipe(map(response => response.data)),
        this.httpService.post('http://app3:3000/', payload).pipe(map(response => response.data)),
      ])
    )
  }

  @RabbitSubscribe({
    exchange: 'app2',
    routingKey: 'app2.app1.relay',
    queue: 'app2-app1-relay',
  })
  public async app2RelayHandler(msg: unknown) {
    console.log(`Received relay message: ${JSON.stringify(msg)}`)
  }

  @RabbitSubscribe({
    exchange: 'app2',
    routingKey: 'app2.*.task',
    queue: 'app2-wild-task',
  })
  public async app2WildHandler(msg: unknown) {
    console.log(`Received wild message: ${JSON.stringify(msg)}`)
  }

  @RabbitSubscribe({
    exchange: 'app3',
    routingKey: 'app3.app1.relay',
    queue: 'app3-app1-relay',
  })
  public async app3RelayHandler(msg: unknown) {
    console.log(`Received relay message: ${JSON.stringify(msg)}`)
  }

  @RabbitSubscribe({
    exchange: 'app3',
    routingKey: 'app3.app1.task',
    queue: 'app3-app1-task',
  })
  public async app3TaskHandler(msg: unknown) {
    console.log(`Received task message: ${JSON.stringify(msg)}`)
  }
}
