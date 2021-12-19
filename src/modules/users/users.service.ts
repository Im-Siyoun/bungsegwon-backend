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
}
