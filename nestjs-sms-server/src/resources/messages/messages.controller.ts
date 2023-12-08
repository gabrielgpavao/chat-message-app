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
    MessageEvent,
    Sse,
    Req,
} from '@nestjs/common'
import { Request } from 'express'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { ZodValidationPipe } from 'nestjs-zod'
import { Schema } from 'mongoose'
import { Observable, defer, map, repeat } from 'rxjs'

@UsePipes(ZodValidationPipe)
@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @Post('send')
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messagesService.create(createMessageDto)
    }

    @Get()
    findAll(@Req() req: Request) {
        console.log(req.user)

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

    @Sse(':senderId/chat/:receiverId')
    getMessages(
        @Param('senderId') senderId: Schema.Types.ObjectId,
        @Param('receiverId') receiverId: Schema.Types.ObjectId,
    ): Observable<MessageEvent> {
        return defer(() =>
            this.messagesService.listMessagesByReceiver(senderId, receiverId),
        ).pipe(
            repeat({
                delay: 1500,
            }),
            map((report) => ({
                type: 'message',
                data: report,
            })),
        )
    }
}
