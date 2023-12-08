import { AuthGuard } from '@nestjs/passport'
import {
    BadRequestException,
    ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { loginUserSchema } from '../schemas/login.schema'
import { ZodError } from 'zod'
import { Observable } from 'rxjs'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
    ): TUser {
        const reqBody = context.switchToHttp().getRequest().body

        try {
            loginUserSchema.parse(reqBody)
        } catch (error) {
            if (error instanceof ZodError)
                throw new BadRequestException(error.errors)
            throw error
        }

        return super.handleRequest(err, user, info, context)
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const reqBody = context.switchToHttp().getRequest().body

        context.switchToHttp().getRequest().body = {
            ...reqBody,
            password: Math.random(),
        }

        return super.canActivate(context)
    }
}
