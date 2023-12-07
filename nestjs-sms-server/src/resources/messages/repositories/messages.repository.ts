import { Schema } from 'mongoose'
import { CreateMessageDto } from '../dto/create-message.dto'
import { Message } from '../schemas/messages.schema'

export abstract class MessagesRepository {
    abstract create(data: CreateMessageDto): Promise<Message>
    abstract findAll(): Promise<Message[]>
    abstract listMessagesByReceiver(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): Promise<Message[]>
    abstract findOne(id: Schema.Types.ObjectId): Promise<Message>
    abstract remove(id: Schema.Types.ObjectId): Promise<void>
    abstract reset(): Promise<void>
}
