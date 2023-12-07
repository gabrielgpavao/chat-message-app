import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Schema as SchemaType } from 'mongoose'
import { Message } from 'src/resources/messages/schemas/messages.schema'

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ trim: true, required: true })
    contact: string

    @Prop({ type: Date, default: Date.now })
    createdAt: Date

    @Prop({ type: [{ type: SchemaType.Types.ObjectId, ref: 'Message' }] })
    messages: Message[]
}

export const UserSchema = SchemaFactory.createForClass(User)
