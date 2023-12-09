import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

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
}
