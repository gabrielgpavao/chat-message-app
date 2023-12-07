import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ trim: true, required: true })
    contact: string

    @Prop({ type: Date, default: Date.now })
    createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
