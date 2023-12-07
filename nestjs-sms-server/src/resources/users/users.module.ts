import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersRepository } from './repositories/users.repository'
import { UsersMongooseRepository } from './repositories/mongoose/users.mongoose'
import { User, UserSchema } from './schemas/users.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: UsersRepository,
            useClass: UsersMongooseRepository,
        },
    ],
})
export class UsersModule {}
