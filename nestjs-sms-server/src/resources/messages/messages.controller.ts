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
    UseGuards,
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { ZodValidationPipe } from 'nestjs-zod'
import { Schema } from 'mongoose'
import { Observable, defer, map, repeat } from 'rxjs'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@UsePipes(ZodValidationPipe)
@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('send/:receiverId')
    create(
        @Param('receiverId') receiverId: Schema.Types.ObjectId,
        @Body() createMessageDto: CreateMessageDto,
        @Req() { user },
    ) {
        return this.messagesService.create({
            content: createMessageDto.content,
            senderId: user.id,
            receiverId,
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.messagesService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: Schema.Types.ObjectId) {
        return this.messagesService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: Schema.Types.ObjectId) {
        return this.messagesService.remove(id)
    }

    @UseGuards(JwtAuthGuard)
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
