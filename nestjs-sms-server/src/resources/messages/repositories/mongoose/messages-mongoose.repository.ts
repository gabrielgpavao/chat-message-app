import { Injectable } from '@nestjs/common'
import { MessagesRepository, iCreateMessageData } from '../messages.repository'
import { Model, Schema } from 'mongoose'
import { Message } from '../../schemas/messages.schema'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class MessagesMongooseRepository implements MessagesRepository {
    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<Message>,
    ) {}

    async create({
        content,
        senderId,
        receiverId,
    }: iCreateMessageData): Promise<Message> {
        const newMessage = new this.messageModel({
            content,
            sender: senderId,
            receiver: receiverId,
        })
        return await newMessage.save()
    }

    async findAll(): Promise<Message[]> {
        return await this.messageModel.find().exec()
    }

    async listMessagesByReceiver(
        senderId: Schema.Types.ObjectId,
        receiverId: Schema.Types.ObjectId,
    ): Promise<Message[]> {
        return await this.messageModel
            .find({ sender: senderId, receiver: receiverId })
            .exec()
    }

    async findOne(id: Schema.Types.ObjectId): Promise<Message> {
        return await this.messageModel.findById(id)
    }

    async remove(id: Schema.Types.ObjectId): Promise<void> {
        await this.messageModel.findByIdAndDelete(id)
    }

    async reset(): Promise<void> {
        await this.messageModel.deleteMany()
    }
}
