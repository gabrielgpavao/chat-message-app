import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaType } from 'mongoose'
import { User } from 'src/resources/users/schemas/users.schema'

export enum MessageStatus {
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    READ = 'READ',
    FAILED = 'FAILED',
}

@Schema()
export class Message extends Document {
    @Prop({ required: true })
    content: string

    @Prop({ default: MessageStatus.SENT, enum: MessageStatus })
    status: MessageStatus = MessageStatus.SENT

    @Prop({ type: Date, default: Date.now })
    sentAt: Date

    @Prop({ type: SchemaType.Types.ObjectId, ref: 'User', required: true })
    sender: User

    @Prop({ type: SchemaType.Types.ObjectId, ref: 'User', required: true })
    receiver: User
}

export const MessageSchema = SchemaFactory.createForClass(Message)
