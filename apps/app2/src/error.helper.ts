import { Channel, ConsumeMessage } from 'amqplib'

export function errorCallback(exchange: string, routingKey: string) {
  return async (channel: Channel, msg: ConsumeMessage, error: any) => {
    const { correlationId } = msg.properties

    if (error instanceof Error) {
      error = error.message
    } else if (typeof error !== 'string') {
      error = JSON.stringify(error)
    }

    error = Buffer.from(JSON.stringify({ status: 'error', message: error }))

    await channel.assertExchange(exchange, 'topic')
    const queue = await channel.assertQueue(`${exchange}.dead-letter`)
    await channel.bindQueue(queue.queue, exchange, routingKey)

    channel.publish(exchange, routingKey, error, { correlationId })
    channel.ack(msg)
  }
}
