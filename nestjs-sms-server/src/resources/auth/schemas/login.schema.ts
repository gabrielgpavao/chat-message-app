import { z } from 'nestjs-zod/z'

export const loginUserSchema = z.object({
    contact: z.string().min(1).max(127).trim(),
})
