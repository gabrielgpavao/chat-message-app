import { Schema } from 'mongoose'
import { Message } from '../schemas/messages.schema'

export interface iCreateMessageData {
    senderId: Schema.Types.ObjectId
    receiverId: Schema.Types.ObjectId
    content: string
}

export abstract class MessagesRepository {
    abstract create(data: iCreateMessageData): Promise<Message>
    abstract findAll(): Promise<Message[]>
    abstract listMessagesByReceiver(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): Promise<Message[]>
    abstract findOne(id: Schema.Types.ObjectId): Promise<Message>
    abstract remove(id: Schema.Types.ObjectId): Promise<Message>
    abstract reset(): Promise<void>
}
