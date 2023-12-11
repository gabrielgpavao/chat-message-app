import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { Message } from '../schemas/messages.schema'
import { Schema } from 'mongoose'

@Injectable()
export class MessagesProducer {
    constructor(
        @InjectQueue('messages-queue')
        private readonly messagesQueue: Queue,
    ) {}

    addMessageToQueue(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
        message: Message,
    ) {
        this.messagesQueue.add(
            'message-sent-job',
            JSON.stringify({ senderId, receiverId, message }),
        )
    }

    async messageDeletedQueue(key: string, id: Schema.Types.ObjectId) {
        await this.messagesQueue.add(
            'message-deleted-job',
            JSON.stringify({ key, id }),
        )
    }
}
