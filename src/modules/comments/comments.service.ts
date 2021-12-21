import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment, CommentDocument } from '../comments/schemas/comments.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(commentdto: CreateCommentDto): Promise<Comment> {
    const comment = { ...commentdto };
    const result = await this.commentModel.create(comment);

    return result;
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
