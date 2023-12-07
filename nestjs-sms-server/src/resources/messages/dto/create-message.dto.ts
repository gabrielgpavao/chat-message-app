import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { MessageStatus } from '../schemas/messages.schema'
import { Types } from 'mongoose'

const createMessageSchema = z.object({
    content: z.string().min(1),
    status: z.nativeEnum(MessageStatus),
    sender: z.string(),
    receiver: z.custom((value) => Types.ObjectId.isValid(value.toString())),
})

export class CreateMessageDto extends createZodDto(createMessageSchema) {}
