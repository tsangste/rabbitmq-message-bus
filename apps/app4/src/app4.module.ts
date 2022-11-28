import { Module } from '@nestjs/common'
import { App4Controller } from './app4.controller'
import { App4Service } from './app4.service'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'app2',
          type: 'topic',
        },
        {
          name: 'app3',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [App4Controller],
  providers: [App4Service],
})
export class App4Module {}
