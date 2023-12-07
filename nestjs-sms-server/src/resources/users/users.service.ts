import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersRepository } from './repositories/users.repository'
import { User } from './schemas/users.schema'
import { Schema } from 'mongoose'

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.usersRepository.create(createUserDto)
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.findAll()
    }

    async findOne(id: Schema.Types.ObjectId): Promise<User> {
        return await this.usersRepository.findOne(id)
    }

    async update(
        id: Schema.Types.ObjectId,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return await this.usersRepository.update(id, updateUserDto)
    }

    async remove(id: Schema.Types.ObjectId): Promise<void> {
        return await this.usersRepository.remove(id)
    }

    async reset(): Promise<void> {
        return await this.usersRepository.reset()
    }
}
