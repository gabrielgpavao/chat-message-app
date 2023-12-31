import { Injectable } from '@nestjs/common'
import {
    MessagesRepository,
    iCreateMessageData,
} from './repositories/messages.repository'
import { Message } from './schemas/messages.schema'
import { Schema } from 'mongoose'
import { RedisService } from 'src/cache/redis.service'
import { MessagesProducer } from './jobs/messages.producer'

@Injectable()
export class MessagesService {
    constructor(
        private readonly messagesRepository: MessagesRepository,
        private readonly redisService: RedisService,
        private readonly messagesProducer: MessagesProducer,
    ) {}

    async create(createMessageDto: iCreateMessageData): Promise<Message> {
        const newMessage =
            await this.messagesRepository.create(createMessageDto)

        this.messagesProducer.addMessageToQueue(
            createMessageDto.senderId,
            createMessageDto.receiverId,
            newMessage,
        )

        return newMessage
    }

    async findAll(): Promise<Message[]> {
        return await this.messagesRepository.findAll()
    }

    async listMessagesByReceiver(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): Promise<Message[]> {
        const cacheDatabaseName = await this.redisService.messageCacheDatabase(
            senderId,
            receiverId,
        )

        return (
            (await this.redisService.getParsedCachedData<Message[]>(
                cacheDatabaseName,
            )) ?? []
        )
    }

    async findOne(id: Schema.Types.ObjectId): Promise<Message> {
        return await this.messagesRepository.findOne(id)
    }

    async remove(id: Schema.Types.ObjectId): Promise<void> {
        const deletedMessage = await this.messagesRepository.remove(id)

        if (deletedMessage) {
            const cacheDatabaseName =
                await this.redisService.messageCacheDatabase(
                    deletedMessage.sender._id.toString(),
                    deletedMessage.receiver._id.toString(),
                )

            await this.messagesProducer.messageDeletedQueue(
                cacheDatabaseName,
                id,
            )
        }
    }

    async reset(): Promise<void> {
        await this.messagesRepository.reset()
        await this.redisService.flushdb()
    }
}
