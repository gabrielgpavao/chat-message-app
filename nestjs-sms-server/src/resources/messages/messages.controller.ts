import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UsePipes,
    HttpCode,
    HttpStatus,
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { ZodValidationPipe } from 'nestjs-zod'
import { Schema } from 'mongoose'

@UsePipes(ZodValidationPipe)
@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post('send')
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto)
    }

    @Get()
    findAll() {
        return this.messagesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: Schema.Types.ObjectId) {
        return this.messagesService.findOne(id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: Schema.Types.ObjectId) {
        return this.messagesService.remove(id)
    }

    @Delete('reset/database')
    @HttpCode(HttpStatus.NO_CONTENT)
    reset() {
        return this.messagesService.reset()
    }
}
