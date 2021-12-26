import { UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User, UserDocument } from './schemas/users.schema';

export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userdto: CreateUserDto): Promise<User> {
    const user = { ...userdto };
    const result = await this.userModel.create(user);

    return result;
  }

  async update(id: string, userdto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate({ _id: id }, userdto);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();

    return users;
  }

  async delete(id: string): Promise<User> {
    const user = await this.userModel.findOneAndDelete({ _id: id });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async like(id: string, storeId: string): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { liked_stores: storeId } },
    );

    return user;
  }

  async storePost(id: string, storeId: string): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { created_stores: storeId } },
    );

    return user;
  }

  async comment(id: string, commentId: string): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: id },
      { $push: { my_comments: commentId } },
    );

    return user;
  }

  async populateStore(_id: string): Promise<any> {
    const user = await this.userModel
      .findOne({ _id })
      .populate({ path: 'created_stores', model: 'Store' });

    return user.created_stores;
  }

  async populatelikedStore(_id: string): Promise<any> {
    const user = await this.userModel
      .findOne({ _id })
      .populate({ path: 'liked_stores', model: 'Store' });

    return user.liked_stores;
  }

  async populateComment(_id: string): Promise<any> {
    const user = await this.userModel
      .findOne({ _id })
      .populate({ path: 'my_comments', model: 'Comment' });

    return user.my_comments;
  }
}
