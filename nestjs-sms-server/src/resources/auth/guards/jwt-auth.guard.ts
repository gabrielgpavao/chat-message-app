import { AuthGuard } from '@nestjs/passport'
import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
    ): TUser {
        if (info) throw new UnauthorizedException(info.toString())

        return super.handleRequest(err, user, info, context)
    }
}
