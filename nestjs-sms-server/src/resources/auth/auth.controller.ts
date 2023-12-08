import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from './dto/login.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    create(@Body() loginUserDto: LoginUserDto) {
        return this.authService.create(loginUserDto)
    }
}
