import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const loginUserSchema = z.object({
    contact: z.string().min(1).max(127).trim(),
})

export class LoginUserDto extends createZodDto(loginUserSchema) {}
