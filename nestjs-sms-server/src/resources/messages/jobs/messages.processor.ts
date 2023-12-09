import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { RedisService } from 'src/cache/redis.service'
import { Message } from '../schemas/messages.schema'

@Processor('messages-queue')
export class MessagesProcessor {
    constructor(private readonly redisService: RedisService) {}

    @Process('message-sent-job')
    async setMessageToCache(job: Job<string>) {
        const { key, message } = JSON.parse(job.data)

        const cachedMessages: Message[] =
            (await this.redisService.getParsedCachedData<Message[]>(key)) ?? []

        const updatedCachedMessages: Message[] = [...cachedMessages, message]

        this.redisService.set(key, JSON.stringify(updatedCachedMessages))
    }

    @Process('message-deleted-job')
    async deleteMessageFromCache(job: Job<string>) {
        const { key, id } = JSON.parse(job.data)

        const cachedMessages: Message[] =
            (await this.redisService.getParsedCachedData<Message[]>(key)) ?? []

        const updatedCachedMessages = cachedMessages.length
            ? cachedMessages.filter((message: Message) => message.id !== id)
            : cachedMessages

        await this.redisService.set(key, JSON.stringify(updatedCachedMessages))
    }
}
