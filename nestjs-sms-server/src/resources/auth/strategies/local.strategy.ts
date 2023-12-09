import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'contact',
        })
    }

    async validate(contact: string) {
        const user = await this.authService.validateUser(contact)

        if (!user) {
            throw new UnauthorizedException('InvalidData', {
                cause: 'The contact is invalid or might not exist',
                description: 'Invalid contact',
            })
        }

        return user
    }
}
