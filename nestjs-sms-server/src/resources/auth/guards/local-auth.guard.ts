import { AuthGuard } from '@nestjs/passport'
import {
    BadRequestException,
    ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { loginUserSchema } from '../schemas/login.schema'
import { ZodError } from 'zod'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
    ): TUser {
        try {
            loginUserSchema.parse(context.switchToHttp().getRequest().body)
        } catch (error) {
            if (error instanceof ZodError)
                throw new BadRequestException(error.errors)
            throw error
        }

        return super.handleRequest(err, user, info, context)
    }
}
