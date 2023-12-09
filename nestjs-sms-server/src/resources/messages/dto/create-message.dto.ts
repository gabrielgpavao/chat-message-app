import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const createMessageSchema = z.object({
    content: z.string().min(1),
})

export class CreateMessageDto extends createZodDto(createMessageSchema) {}
