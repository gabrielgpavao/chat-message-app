import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(contact: string) {
        const user = await this.usersService.findByContact(contact)

        if (!user) return null

        return {
            id: user.id,
            contact: user.contact,
        }
    }
}
