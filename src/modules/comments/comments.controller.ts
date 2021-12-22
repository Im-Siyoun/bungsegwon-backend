import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../auth/auth.service';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './schemas/comments.schema';

@Controller('/comment')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);
    createCommentDto.uid = json.id;

    return this.commentsService.create(createCommentDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Req() request: Request,
    @Body(ValidationPipe) updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);
    updateCommentDto.uid = json.id;

    return this.commentsService.update(id, updateCommentDto);
  }
}
