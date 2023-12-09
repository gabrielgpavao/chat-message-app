import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import { RedisService } from 'src/cache/redis.service'
import { Message } from '../schemas/messages.schema'

@Processor('messages-queue')
export class MessagesProcessor {
    constructor(private readonly redisService: RedisService) {}

    @Process('messages-job')
    async setMessageToCache(job: Job<string>) {
        console.log('Consumindo mensagem...\n')

        const cachedMessages: Message[] =
            (await this.redisService.getParsedCachedData<Message[]>(
                'messages',
            )) ?? []

        const updatedCachedMessages: Message[] = [
            ...cachedMessages,
            JSON.parse(job.data),
        ]

        this.redisService
            .set('messages', JSON.stringify(updatedCachedMessages))
            .then(() => console.log('Cache atualizado\n'))
    }
}
