import { Module } from '@nestjs/common'
import { MessagesService } from './messages.service'
import { MessagesController } from './messages.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Message, MessageSchema } from './schemas/messages.schema'
import { MessagesRepository } from './repositories/messages.repository'
import { MessagesMongooseRepository } from './repositories/mongoose/messages-mongoose.repository'
import { RedisService } from 'src/cache/redis.service'
import { BullModule } from '@nestjs/bull'
import { MessagesProducer } from './jobs/messages.producer'
import { MessagesProcessor } from './jobs/messages.processor'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
        ]),
        BullModule.registerQueue({ name: 'messages-queue' }),
    ],
    controllers: [MessagesController],
    providers: [
        MessagesService,
        {
            provide: MessagesRepository,
            useClass: MessagesMongooseRepository,
        },
        RedisService,
        MessagesProducer,
        MessagesProcessor,
    ],
})
export class MessagesModule {}
