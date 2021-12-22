import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    type: String,
  })
  created_stores: string[];

  @Prop({
    type: String,
  })
  liked_stores: string[];

  @Prop({
    type: String,
  })
  my_comments: string[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
