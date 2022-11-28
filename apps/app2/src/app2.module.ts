import { Module } from '@nestjs/common'

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

import { App2Controller } from './app2.controller'
import { App2Service } from './app2.service'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'app2',
          type: 'topic',
        },
      ],
      uri: 'amqp://rabbitmq:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [App2Controller],
  providers: [App2Service],
})
export class App2Module {}
