import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from 'src/auth/google.guard';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createuserdto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createuserdto);
  }

  @Get()
  @UseGuards(GoogleOauthGuard)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Put('/:nickname')
  @UseGuards(GoogleOauthGuard)
  async update(
    @Param('nickname') nickname: string,
    @Body(ValidationPipe) updateuserdto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(nickname, updateuserdto);
  }

  @Delete('/:nickname')
  @UseGuards(GoogleOauthGuard)
  async delete(@Param('nickname') nickname: string): Promise<User> {
    return this.usersService.delete(nickname);
  }
}
