import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment, CommentDocument } from '../comments/schemas/comments.schema';
import { User } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly userService: UsersService,
  ) {}

  async create(id: string, commentdto: CreateCommentDto): Promise<User> {
    const comment = { ...commentdto };
    const result = await this.commentModel.create(comment);
    const user = await this.userService.comment(id, result._id);

    return user;
  }

  async update(id: string, commentdto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentModel.findOne({ _id: id });
    if (comment.uid !== commentdto.uid) {
      throw new Error('권한이 없습니다.');
    }
    const result = comment.update(commentdto);

    return result;
  }
}
