import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  _id: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  nickname: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  provider: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Store',
  })
  created_stores: Types.ObjectId[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Store',
  })
  liked_stores: string[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Comment',
  })
  my_comments: string[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
