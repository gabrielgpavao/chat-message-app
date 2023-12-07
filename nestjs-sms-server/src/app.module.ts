import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './resources/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MessagesModule } from './resources/messages/messages.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.DATABASE_URL),
        UsersModule,
        MessagesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
