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

    addMessageToQueue(key: string, message: Message) {
        this.messagesQueue.add('messages-job', JSON.stringify({ key, message }))
    }
}
