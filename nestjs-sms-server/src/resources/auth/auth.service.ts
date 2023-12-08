import { Injectable } from '@nestjs/common'
import { LoginUserDto } from './dto/login.dto'

@Injectable()
export class AuthService {
    create(loginUserDto: LoginUserDto) {
        return 'This action adds a new auth'
    }
}
