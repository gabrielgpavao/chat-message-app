import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login.dto'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    create(@Body() loginUserDto: LoginUserDto) {
        return this.authService.create(loginUserDto)
    }
}
