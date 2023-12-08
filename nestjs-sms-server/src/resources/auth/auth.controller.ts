import {
    Controller,
    Post,
    Body,
    UseGuards,
    UsePipes,
    Req,
} from '@nestjs/common'
import { AuthService, tLoginParams } from './auth.service'
import { LoginUserDto } from './dto/login.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { ZodValidationPipe } from 'nestjs-zod'
import { Request } from 'express'

@UsePipes(ZodValidationPipe)
@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post()
    login(@Body() _: LoginUserDto, @Req() request: Request) {
        return this.authService.login(request.user as tLoginParams)
    }
}
