import { Module } from '@nestjs/common'

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

import { App3Controller } from './app3.controller'
import { App3Service } from './app3.service'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'app3',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [App3Controller],
  providers: [App3Service],
})
export class App3Module {}
