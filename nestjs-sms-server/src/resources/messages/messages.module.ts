import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Message, MessageSchema } from './schemas/messages.schema'
import { MessagesRepository } from './repositories/messages.repository'
import { MessagesMongooseRepository } from './repositories/mongoose/messages-mongoose.repository'
import { RedisService } from 'src/cache/redis.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
        ]),
    ],
    controllers: [MessagesController],
    providers: [
        MessagesService,
        {
            provide: MessagesRepository,
            useClass: MessagesMongooseRepository,
        },
        RedisService,
    ],
})
export class MessagesModule {}
