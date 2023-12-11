import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'
import { Schema } from 'mongoose'

@Injectable()
export class RedisService extends Redis {
    constructor() {
        super({
            host: 'redis-cache',
            password: process.env.REDIS_PASSWORD,
        })

        super.on('error', (error) => {
            console.error(error)
            process.exit(1)
        })

        super.on('connect', () => {
            console.log('Redis connected!')
        })
    }

    async getParsedCachedData<T = unknown>(key: string): Promise<T | null> {
        const cachedMessages: string | null = await this.get(key)

        return JSON.parse(cachedMessages)
    }

    private messageCacheDatabaseName(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): string {
        return 'message' + ':' + senderId + ':' + receiverId
    }

    async messageCacheDatabase(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): Promise<string | null> {
        const firstOptionName = this.messageCacheDatabaseName(
            senderId,
            receiverId,
        )

        const firstOptionDatabase = await this.get(firstOptionName)

        if (firstOptionDatabase) return firstOptionName

        const secondOptionName = this.messageCacheDatabaseName(
            receiverId,
            senderId,
        )

        const secondOptionDatabase = await this.get(secondOptionName)

        if (secondOptionDatabase) return secondOptionName

        return this.messageCacheDatabaseName(senderId, receiverId)
    }
}
