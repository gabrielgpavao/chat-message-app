import { Controller, Post, UseGuards, Req } from '@nestjs/common'
import { AuthService, tLoginParams } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request } from 'express'

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    login(@Req() request: Request) {
        return this.authService.login(request.user as tLoginParams)
    }
}
