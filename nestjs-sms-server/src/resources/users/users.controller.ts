import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UsePipes,
    UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Schema } from 'mongoose'
import { ZodValidationPipe } from 'nestjs-zod'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UsePipes(ZodValidationPipe)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: Schema.Types.ObjectId) {
        return this.usersService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: Schema.Types.ObjectId,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(id, updateUserDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: Schema.Types.ObjectId) {
        return this.usersService.remove(id)
    }

    @Delete('reset/database')
    @HttpCode(HttpStatus.NO_CONTENT)
    reset() {
        return this.usersService.reset()
    }
}
