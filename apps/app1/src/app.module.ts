import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    HttpModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
