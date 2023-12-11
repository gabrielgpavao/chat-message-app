import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/schemas/users.schema'

export type tLoginParams = Pick<User, 'id' | 'name' | 'contact'> & {
    id: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(contact: string) {
        const user = await this.usersService.findByContact(contact)

        if (!user) return null

        return {
            id: user.id,
            name: user.name,
            contact: user.contact,
        }
    }
    async login({ id, name, contact }: tLoginParams) {
        return {
            user: { id, name, contact },
            token: this.jwtService.sign({ name, contact }, { subject: id }),
        }
    }
}
