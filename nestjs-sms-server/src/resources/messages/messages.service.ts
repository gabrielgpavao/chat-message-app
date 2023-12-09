import { Injectable } from '@nestjs/common'
import {
    MessagesRepository,
    iCreateMessageData,
} from './repositories/messages.repository'
import { Message } from './schemas/messages.schema'
import { Schema } from 'mongoose'
import { RedisService } from 'src/cache/redis.service'

@Injectable()
export class MessagesService {
    constructor(
        private readonly messagesRepository: MessagesRepository,
        private readonly redisService: RedisService,
    ) {}

    private messageCacheDatabaseName(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): string {
        return 'message' + ':' + senderId + ':' + receiverId
    }

    async create(createMessageDto: iCreateMessageData): Promise<Message> {
        const newMessage =
            await this.messagesRepository.create(createMessageDto)

        const cacheDatabaseName = this.messageCacheDatabaseName(
            createMessageDto.senderId,
            createMessageDto.receiverId,
        )

        const parsedCachedMessages: Message[] =
            (await this.redisService.getParsedCachedData<Message[]>(
                cacheDatabaseName,
            )) ?? []

        this.redisService.set(
            cacheDatabaseName,
            JSON.stringify([...parsedCachedMessages, newMessage]),
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
        const cacheDatabaseName = this.messageCacheDatabaseName(
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
        const { sender, receiver } = await this.messagesRepository.remove(id)

        const cacheDatabaseName = this.messageCacheDatabaseName(
            sender.id,
            receiver.id,
        )

        const oldCachedMessages = await this.redisService.get(cacheDatabaseName)

        const updatedCachedMessages = oldCachedMessages
            ? JSON.parse(oldCachedMessages).filter(
                  (message: Message) => message.id !== id,
              )
            : []

        await this.redisService.set(
            cacheDatabaseName,
            JSON.stringify(updatedCachedMessages),
        )
    }

    async reset(): Promise<void> {
        await this.messagesRepository.reset()
        await this.redisService.flushdb()
    }
}
