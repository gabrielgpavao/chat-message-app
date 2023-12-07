import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const createUserSchema = z.object({
    name: z.string().min(1),
    contact: z.string().min(1).max(127).trim(),
})

export class CreateUserDto extends createZodDto(createUserSchema) {}
