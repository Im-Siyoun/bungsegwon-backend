import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop({
    required: true,
    type: String,
  })
  uid: string;

  @Prop({
    required: true,
    type: String,
  })
  sid: string;

  @Prop({
    required: true,
    type: String,
  })
  comment: string;

  @Prop({
    required: true,
    type: String,
  })
  name: string;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
