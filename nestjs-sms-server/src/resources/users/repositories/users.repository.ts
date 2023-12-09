import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { User } from '../schemas/users.schema'
import { Schema } from 'mongoose'

export abstract class UsersRepository {
    abstract create(data: CreateUserDto): Promise<User>
    abstract findAll(): Promise<User[]>
    abstract findOne(id: Schema.Types.ObjectId): Promise<User>
    abstract findByContact(contact: string): Promise<User>
    abstract update(
        id: Schema.Types.ObjectId,
        data: UpdateUserDto,
    ): Promise<User>
    abstract remove(id: Schema.Types.ObjectId): Promise<void>
    abstract reset(): Promise<void>
}
