import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { Message } from '../schemas/messages.schema'

@Injectable()
export class MessagesProducer {
    constructor(
        @InjectQueue('messages-queue')
        private readonly messagesQueue: Queue,
    ) {}

    addMessageToQueue(message: Message) {
        console.log('Publicando mensagem na fila...\n')
        this.messagesQueue.add('messages-job', JSON.stringify(message))
    }
}
