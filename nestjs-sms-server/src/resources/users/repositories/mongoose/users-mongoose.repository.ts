import { InjectModel } from '@nestjs/mongoose'
import { Schema, Model } from 'mongoose'
import { User } from '../../schemas/users.schema'
import { UsersRepository } from '../users.repository'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../../dto/create-user.dto'

@Injectable()
export class UsersMongooseRepository implements UsersRepository {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async create(data: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(data)
        return await newUser.save()
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec()
    }

    async findOne(id: Schema.Types.ObjectId): Promise<User> {
        return await this.userModel.findById(id)
    }

    async findByContact(contact: string): Promise<User> {
        return await this.userModel.findOne({ contact })
    }

    async update(id: Schema.Types.ObjectId, data: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, data, { new: true })
    }

    async remove(id: Schema.Types.ObjectId): Promise<void> {
        await this.userModel.findByIdAndDelete(id)
    }

    async reset(): Promise<void> {
        await this.userModel.deleteMany()
    }
}
