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
import { User } from '../users/schemas/users.schema';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './schemas/stores.schema';
import { StoresService } from './stores.service';

@Controller('/store')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(ValidationPipe) createstoredto: CreateStoreDto,
    @Req() request: any,
  ): Promise<User> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.storesService.create(json.id, createstoredto);
  }

  @Get()
  @UseGuards(GoogleOauthGuard)
  async findAll(): Promise<Store[]> {
    return this.storesService.findAll();
  }

  @Put('/:id')
  async update(
    @Req() request: any,
    @Body(ValidationPipe) updatestoredto: UpdateStoreDto,
    @Param('id') id: string,
  ): Promise<Store> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.storesService.update(json.id, id, updatestoredto);
  }

  @Delete('/:id')
  async delete(@Req() request: any, @Param('id') id: string): Promise<Store> {
    const jwt = request.headers.authorization.replace('Bearer ', '');
    const json = await this.authService.verifyToken(jwt);

    return this.storesService.delete(json.id, id);
  }
}
