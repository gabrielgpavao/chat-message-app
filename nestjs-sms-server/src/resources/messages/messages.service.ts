import { Injectable } from '@nestjs/common'
import {
    MessagesRepository,
    iCreateMessageData,
} from './repositories/messages.repository'
import { Message } from './schemas/messages.schema'
import { Schema } from 'mongoose'

@Injectable()
export class MessagesService {
    constructor(private readonly messagesRepository: MessagesRepository) {}

    async create(createMessageDto: iCreateMessageData): Promise<Message> {
        return await this.messagesRepository.create(createMessageDto)
    }

    async findAll(): Promise<Message[]> {
        return await this.messagesRepository.findAll()
    }

    async listMessagesByReceiver(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): Promise<Message[]> {
        return await this.messagesRepository.listMessagesByReceiver(
            senderId,
            receiverId,
        )
    }

    async findOne(id: Schema.Types.ObjectId): Promise<Message> {
        return await this.messagesRepository.findOne(id)
    }

    async remove(id: Schema.Types.ObjectId): Promise<void> {
        await this.messagesRepository.remove(id)
    }

    async reset(): Promise<void> {
        await this.messagesRepository.reset()
    }
}
