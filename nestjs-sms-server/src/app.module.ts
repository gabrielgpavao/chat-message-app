import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UsersModule } from './resources/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MessagesModule } from './resources/messages/messages.module'
import { AuthModule } from './resources/auth/auth.module'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (conf: ConfigService) => {
                const config = {
                    url: conf.get<string>('REDIS_URL'),
                    ttl: conf.get<number>('REDIS_CACHE_TTL'),
                }
                return {
                    store: await redisStore(config),
                    ...config,
                }
            },
        }),
        UsersModule,
        MessagesModule,
        AuthModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
