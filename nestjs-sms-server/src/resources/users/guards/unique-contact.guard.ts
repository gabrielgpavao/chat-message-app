import {
    CanActivate,
    ConflictException,
    ExecutionContext,
    Injectable,
} from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { UsersService } from '../users.service'

@Injectable()
export class UniqueContactGuard implements CanActivate {
    constructor(private readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const reqBody: Partial<CreateUserDto> = context
            .switchToHttp()
            .getRequest().body

        if (reqBody.contact) {
            const contactAlreadyExists =
                !!(await this.usersService.findByContact(reqBody.contact))

            if (contactAlreadyExists)
                throw new ConflictException(
                    'Conflict',
                    'This contact already exists',
                )
        }

        return true
    }
}
