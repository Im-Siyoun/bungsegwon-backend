import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/modules/auth/auth.service';

import { GoogleOauthGuard } from '../googleoauth2/google.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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

  @Put()
  async update(
    @Req() request: any,
    @Body(ValidationPipe) updateuserdto: UpdateUserDto,
  ): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.usersService.update(json.id, updateuserdto);
  }

  @Delete()
  async delete(@Req() request: any): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.usersService.delete(json.id);
  }

  @Put('/like/:id')
  async like(@Param('id') id: string, @Req() request: any): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.usersService.like(json.id, id);
  }

  @Get('/store')
  async storePost(@Req() request: any): Promise<void> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.usersService.populateStore(json.id);
  }

  @Get('/liked')
  async liked(@Req() request: any): Promise<void> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.usersService.populatelikedStore(json.id);
  }

  @Get('/comments')
  async comments(@Req() request: any): Promise<void> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.usersService.populateComment(json.id);
  }
}
